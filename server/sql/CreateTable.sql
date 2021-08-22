CREATE TABLE users(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR (255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at DATE DEFAULT NOW() NOT NULL
);

CREATE TABLE todos(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
    description VARCHAR(255) NOT NULL
);