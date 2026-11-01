import { env } from 'cloudflare:workers';
import { initialPlan } from '../../data';
import { z } from 'zod';
export const dynamic='force-dynamic';
const amount=z.number().finite().min(0).max(10000000);
const schema=z.object({revision:z.number().int().min(0),plan:z.object({flightId:z.string().max(100),stays:z.object({holiday:z.string().max(100),work:z.string().max(100),bangkok:z.string().max(100).optional()}),overrides:z.record(amount),budget:amount,costs:z.array(z.object({id:z.string().max(100),name:z.string().min(1).max(150),amount})).max(50),checks:z.array(z.string().max(100)).max(100),events:z.array(z.object({id:z.string().max(100),date:z.string().regex(/^\d{4}-\d{2}-\d{2}$/),time:z.string().max(5),title:z.string().min(1).max(200),category:z.string().max(100),price:amount.nullable(),note:z.string().max(2000),activityId:z.string().max(100).optional(),done:z.boolean()})).max(500)})});
function hasPlanLink(request:Request){
 const key=request.headers.get('X-Plan-Link');
 return !!env.PLAN_LINK_KEY && !!key && key===env.PLAN_LINK_KEY;
}
export async function GET(request:Request){
 if(!hasPlanLink(request)) return Response.json({error:'Откройте полную ссылку на общий план.'},{status:403});
 try{const row=await env.DB!.prepare('SELECT payload, revision FROM trip_plans WHERE id = ?').bind('winter-2027').first<{payload:string;revision:number}>();return Response.json({plan:row?JSON.parse(row.payload):initialPlan,revision:row?.revision??0},{headers:{'Cache-Control':'no-store'}});}catch{return Response.json({error:'Не удалось загрузить сохранённый план.'},{status:503});}
}
export async function PUT(request:Request){
 if(!hasPlanLink(request)) return Response.json({error:'Откройте полную ссылку на общий план.'},{status:403});
 const origin=request.headers.get('origin');if(origin&&origin!==new URL(request.url).origin)return Response.json({error:'Недопустимый источник запроса.'},{status:403});
 try{const raw=await request.text();if(raw.length>400000)return Response.json({error:'Слишком большой план.'},{status:413});const parsed=schema.safeParse(JSON.parse(raw));if(!parsed.success)return Response.json({error:'Проверьте даты, названия и суммы.'},{status:400});const {revision,plan}=parsed.data;
 const row=await env.DB!.prepare('INSERT INTO trip_plans (id, payload, revision, updated_at) VALUES (?, ?, 1, ?) ON CONFLICT(id) DO UPDATE SET payload=excluded.payload, revision=trip_plans.revision+1, updated_at=excluded.updated_at WHERE trip_plans.revision=? RETURNING revision').bind('winter-2027',JSON.stringify(plan),new Date().toISOString(),revision).first<{revision:number}>();
 if(!row)return Response.json({error:'План изменён на другом устройстве. Обновите его перед редактированием.'},{status:409});
 return Response.json({revision:row.revision});}catch{return Response.json({error:'Изменения не сохранены. Попробуйте ещё раз.'},{status:503});}
}
