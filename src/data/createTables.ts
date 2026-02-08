import pool from "../config/db.config";

export const createUserTable = async () => {
  const query = `
    create table if not exists users (
      id serial primary key,
      name varchar(40) not null,
      email varchar(100) unique not null,
      password varchar(200) not null,
      isVerified boolean default false,
      isActive boolean default true,
      created_at timestamp default current_timestamp,
      updated_at timestamp default current_timestamp
    );
  `
  try{
    await pool.query(query);
    console.log("User table created");
  }
  catch(error) {
    console.error("Error in creating user table", error);
    return null
  }
}