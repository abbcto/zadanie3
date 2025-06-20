CREATE TABLE
  public.articles (
    id serial NOT NULL,
    title character varying(255) NOT NULL,
    content text NOT NULL,
    author character varying(255) NOT NULL,
    created_at timestamp without time zone NOT NULL DEFAULT now()
  );

ALTER TABLE
  public.articles
ADD
  CONSTRAINT articles_db_pkey PRIMARY KEY (id)