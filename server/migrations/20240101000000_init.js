exports.up = function (knex) {
  return knex.schema
    .createTable("users", (t) => {
      t.increments("id").primary();
      t.string("email").unique().notNullable();
      t.string("password_hash").notNullable();
      t.timestamp("created_at").defaultTo(knex.fn.now());
    })
    .createTable("submissions", (t) => {
      t.increments("id").primary();
      t.string("name").notNullable();
      t.string("phone").notNullable();
      t.string("email");
      t.text("message");
      t.enu("status", ["new", "read", "archived"]).defaultTo("new");
      t.timestamp("created_at").defaultTo(knex.fn.now());
    })
    .createTable("services", (t) => {
      t.increments("id").primary();
      t.string("title").notNullable();
      t.string("description");
      t.string("icon");
      t.integer("sort_order").defaultTo(0);
      t.timestamp("created_at").defaultTo(knex.fn.now());
    })
    .createTable("works", (t) => {
      t.increments("id").primary();
      t.string("title").notNullable();
      t.string("subtitle");
      t.string("tag");
      t.enu("type", ["photo", "video"]).defaultTo("photo");
      t.string("filename");
      t.string("bg_class");
      t.string("width_class");
      t.integer("sort_order").defaultTo(0);
      t.timestamp("created_at").defaultTo(knex.fn.now());
    })
    .createTable("reviews", (t) => {
      t.increments("id").primary();
      t.string("name").notNullable();
      t.string("role");
      t.text("text").notNullable();
      t.integer("rating").defaultTo(5);
      t.string("initials");
      t.timestamp("created_at").defaultTo(knex.fn.now());
    })
    .createTable("cities", (t) => {
      t.increments("id").primary();
      t.string("name").notNullable();
      t.string("description");
      t.string("slug");
      t.jsonb("features");
      t.jsonb("photos");
      t.integer("sort_order").defaultTo(0);
      t.timestamp("created_at").defaultTo(knex.fn.now());
    })
    .createTable("settings", (t) => {
      t.string("key").primary();
      t.text("value");
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("settings")
    .dropTableIfExists("cities")
    .dropTableIfExists("reviews")
    .dropTableIfExists("works")
    .dropTableIfExists("services")
    .dropTableIfExists("submissions")
    .dropTableIfExists("users");
};
