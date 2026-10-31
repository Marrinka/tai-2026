declare namespace Cloudflare {
  interface Env {
    DB?: D1Database;
    PLAN_LINK_KEY?: string;
    BUCKET?: R2Bucket;
  }
}
