import {test} from 'node:test';
import assert from 'node:assert/strict';
import {putSnapshot,offlineStorageKey} from '../app/offline-export.ts';

const template='<html data-thai-offline="1"><script id="thai-offline-state" type="application/json">null</script><div id="root"></div><script>/* app */</script></html>';
const snapshot={version:1,id:'copy-one',createdAt:'2026-11-03T10:00:00Z',view:{section:'budget',region:'Бангкок',month:1,day:'2027-01-16'},plan:{flightId:'hainan-ozon-selected',stays:{bangkok:'test-stay'},budget:450000,overrides:{'flight:hainan-ozon-selected':146202},events:[{title:'</script><script>alert("test")</script> & $& $`',note:'雪\u2028ไทย\u2029',price:null,done:true}],costs:[{name:'Тест',amount:0}],checks:['passport']}};
test('snapshot preserves prices, unknown costs, Unicode and notes without injecting HTML',()=>{
 const html=putSnapshot(template,snapshot);
 assert.equal((html.match(/<script/g)||[]).length,2);
 const payload=html.match(/type="application\/json">([\s\S]*?)<\/script>/)[1];
 assert.deepEqual(JSON.parse(payload),snapshot);
 assert.ok(!payload.includes('<'));
});
test('a second export replaces the embedded snapshot, including edits',()=>{
 const first=putSnapshot(template,snapshot);
 const second={...snapshot,id:'copy-two',plan:{...snapshot.plan,budget:400000}};
 const html=putSnapshot(first,second);
 assert.equal((html.match(/id="thai-offline-state"/g)||[]).length,1);
 assert.deepEqual(JSON.parse(html.match(/type="application\/json">([\s\S]*?)<\/script>/)[1]),second);
 assert.notEqual(offlineStorageKey(snapshot),offlineStorageKey(second));
});
test('a broken or stale download template is rejected instead of downloading an empty page',()=>{
 assert.throws(()=>putSnapshot('<html>404</html>',snapshot));
});
