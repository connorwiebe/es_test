create table if not exists users (
  id serial primary key,
  username text not null,
  "createdAt" timestamptz default now() not null
);

create table if not exists events (
  id serial primary key,
  type text not null,
  data jsonb not null default '{}'::jsonb,
  "streamType" text not null,
  "userId" int references users (id) not null,
  "createdAt" timestamptz default now() not null
);

insert into users (id, username) values (1, 'john_smith') on conflict do nothing;

select
  *
from events
where "userId" = ${userId}
and "streamType" = ${streamType}
order by id desc;