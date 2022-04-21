CREATE DATABASE xim_task;

CREATE TABLE users(
    user_id serial not null PRIMARY KEY,
    user_email varchar(256) not null,
    user_password varchar(64) not null
);

CREATE TABLE files(
    file_id serial not null PRIMARY KEY,
    file_name text not null,
    file_mime_type varchar(44) not null,
    file_extension varchar(44) not null,
    file_size bigint not null,
    created_at timestamptz DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamptz
);