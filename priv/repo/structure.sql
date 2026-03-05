--
-- PostgreSQL database dump
--

\restrict ZmZAad8eEyGAJVsFy7iEIGmc0vY2uIQ8WDa2PmQpqaucjEYq2Le3UbU9tjv7rSL

-- Dumped from database version 17.8 (Postgres.app)
-- Dumped by pg_dump version 18.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: citext; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS citext WITH SCHEMA public;


--
-- Name: EXTENSION citext; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION citext IS 'data type for case-insensitive character strings';


--
-- Name: oban_job_state; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.oban_job_state AS ENUM (
    'available',
    'scheduled',
    'executing',
    'retryable',
    'completed',
    'discarded',
    'cancelled'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: account; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.account (
    id uuid NOT NULL,
    name character varying(255),
    email character varying(255),
    type character varying(255),
    extra jsonb,
    last_authenticated_at timestamp(0) without time zone,
    marketing_emails_subscribed_at timestamp(0) without time zone DEFAULT now(),
    created_at timestamp(0) without time zone NOT NULL,
    updated_at timestamp(0) without time zone NOT NULL
);


--
-- Name: admins; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.admins (
    id uuid NOT NULL,
    email public.citext NOT NULL,
    hashed_password character varying(255),
    confirmed_at timestamp(0) without time zone,
    created_at timestamp(0) without time zone NOT NULL,
    updated_at timestamp(0) without time zone NOT NULL,
    name character varying(255),
    language character varying(255) DEFAULT 'en'::character varying NOT NULL
);


--
-- Name: admins_tokens; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.admins_tokens (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    token bytea NOT NULL,
    context character varying(255) NOT NULL,
    sent_to character varying(255),
    authenticated_at timestamp(0) without time zone,
    created_at timestamp(0) without time zone NOT NULL
);


--
-- Name: apps; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.apps (
    id uuid NOT NULL,
    name character varying(255),
    description character varying(255),
    url character varying(255),
    thumbnail character varying(255),
    publisher_id uuid,
    created_at timestamp(0) without time zone NOT NULL,
    updated_at timestamp(0) without time zone NOT NULL,
    key uuid NOT NULL
);


--
-- Name: item; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.item (
    id uuid NOT NULL,
    name character varying(255),
    description text,
    path character varying(255),
    extra jsonb,
    type character varying(255),
    settings jsonb,
    creator_id uuid,
    created_at timestamp(0) without time zone NOT NULL,
    updated_at timestamp(0) without time zone NOT NULL
);


--
-- Name: localized_emails; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.localized_emails (
    id uuid NOT NULL,
    subject character varying(255) NOT NULL,
    message character varying NOT NULL,
    button_text character varying(255),
    button_url character varying(2048),
    language character varying(255) NOT NULL,
    notification_id uuid,
    created_at timestamp(0) without time zone NOT NULL,
    updated_at timestamp(0) without time zone NOT NULL
);


--
-- Name: maintenance; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.maintenance (
    slug character varying(255) NOT NULL,
    start_at timestamp(0) without time zone NOT NULL,
    end_at timestamp(0) without time zone NOT NULL
);


--
-- Name: notification_logs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.notification_logs (
    id uuid NOT NULL,
    email character varying(255),
    status character varying(255) NOT NULL,
    notification_id uuid NOT NULL,
    created_at timestamp(0) without time zone NOT NULL,
    CONSTRAINT status_must_be_valid CHECK (((status)::text = ANY ((ARRAY['sent'::character varying, 'failed'::character varying])::text[])))
);


--
-- Name: notification_pixels; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.notification_pixels (
    id uuid NOT NULL,
    slug character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    notification_id uuid,
    created_at timestamp(0) without time zone NOT NULL,
    updated_at timestamp(0) without time zone NOT NULL
);


--
-- Name: notifications; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.notifications (
    id uuid NOT NULL,
    name character varying(255),
    created_at timestamp(0) without time zone NOT NULL,
    updated_at timestamp(0) without time zone NOT NULL,
    audience character varying(255) NOT NULL,
    total_recipients integer DEFAULT 0,
    default_language character varying(255) DEFAULT 'en'::character varying NOT NULL,
    use_strict_languages boolean DEFAULT false NOT NULL,
    sent_at timestamp(0) without time zone
);


--
-- Name: oban_jobs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.oban_jobs (
    id bigint NOT NULL,
    state public.oban_job_state DEFAULT 'available'::public.oban_job_state NOT NULL,
    queue text DEFAULT 'default'::text NOT NULL,
    worker text NOT NULL,
    args jsonb DEFAULT '{}'::jsonb NOT NULL,
    errors jsonb[] DEFAULT ARRAY[]::jsonb[] NOT NULL,
    attempt integer DEFAULT 0 NOT NULL,
    max_attempts integer DEFAULT 20 NOT NULL,
    inserted_at timestamp without time zone DEFAULT timezone('UTC'::text, now()) NOT NULL,
    scheduled_at timestamp without time zone DEFAULT timezone('UTC'::text, now()) NOT NULL,
    attempted_at timestamp without time zone,
    completed_at timestamp without time zone,
    attempted_by text[],
    discarded_at timestamp without time zone,
    priority integer DEFAULT 0 NOT NULL,
    tags text[] DEFAULT ARRAY[]::text[],
    meta jsonb DEFAULT '{}'::jsonb,
    cancelled_at timestamp without time zone,
    CONSTRAINT attempt_range CHECK (((attempt >= 0) AND (attempt <= max_attempts))),
    CONSTRAINT positive_max_attempts CHECK ((max_attempts > 0)),
    CONSTRAINT queue_length CHECK (((char_length(queue) > 0) AND (char_length(queue) < 128))),
    CONSTRAINT worker_length CHECK (((char_length(worker) > 0) AND (char_length(worker) < 128)))
);


--
-- Name: TABLE oban_jobs; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE public.oban_jobs IS '13';


--
-- Name: oban_jobs_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.oban_jobs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: oban_jobs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.oban_jobs_id_seq OWNED BY public.oban_jobs.id;


--
-- Name: oban_peers; Type: TABLE; Schema: public; Owner: -
--

CREATE UNLOGGED TABLE public.oban_peers (
    name text NOT NULL,
    node text NOT NULL,
    started_at timestamp without time zone NOT NULL,
    expires_at timestamp without time zone NOT NULL
);


--
-- Name: publication_removal_notices; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.publication_removal_notices (
    id uuid NOT NULL,
    publication_name character varying(255),
    reason text,
    creator_id uuid,
    created_at timestamp(0) without time zone NOT NULL,
    item_id uuid
);


--
-- Name: published_items; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.published_items (
    id uuid NOT NULL,
    creator_id uuid NOT NULL,
    created_at timestamp(0) without time zone NOT NULL,
    updated_at timestamp(0) without time zone NOT NULL,
    item_path character varying(255)
);


--
-- Name: publishers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.publishers (
    id uuid NOT NULL,
    name character varying(255),
    origins character varying(255)[],
    created_at timestamp(0) without time zone NOT NULL,
    updated_at timestamp(0) without time zone NOT NULL
);


--
-- Name: schema_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.schema_migrations (
    version bigint NOT NULL,
    inserted_at timestamp(0) without time zone
);


--
-- Name: oban_jobs id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.oban_jobs ALTER COLUMN id SET DEFAULT nextval('public.oban_jobs_id_seq'::regclass);


--
-- Name: account account_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT account_pkey PRIMARY KEY (id);


--
-- Name: admins admins_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_pkey PRIMARY KEY (id);


--
-- Name: admins_tokens admins_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.admins_tokens
    ADD CONSTRAINT admins_tokens_pkey PRIMARY KEY (id);


--
-- Name: apps apps_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.apps
    ADD CONSTRAINT apps_pkey PRIMARY KEY (id);


--
-- Name: item item_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.item
    ADD CONSTRAINT item_pkey PRIMARY KEY (id);


--
-- Name: localized_emails localized_emails_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.localized_emails
    ADD CONSTRAINT localized_emails_pkey PRIMARY KEY (id);


--
-- Name: maintenance maintenance_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.maintenance
    ADD CONSTRAINT maintenance_pkey PRIMARY KEY (slug);


--
-- Name: oban_jobs non_negative_priority; Type: CHECK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE public.oban_jobs
    ADD CONSTRAINT non_negative_priority CHECK ((priority >= 0)) NOT VALID;


--
-- Name: notification_logs notification_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.notification_logs
    ADD CONSTRAINT notification_logs_pkey PRIMARY KEY (id);


--
-- Name: notification_pixels notification_pixels_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.notification_pixels
    ADD CONSTRAINT notification_pixels_pkey PRIMARY KEY (id);


--
-- Name: notifications notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (id);


--
-- Name: oban_jobs oban_jobs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.oban_jobs
    ADD CONSTRAINT oban_jobs_pkey PRIMARY KEY (id);


--
-- Name: oban_peers oban_peers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.oban_peers
    ADD CONSTRAINT oban_peers_pkey PRIMARY KEY (name);


--
-- Name: publication_removal_notices publication_removal_notices_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.publication_removal_notices
    ADD CONSTRAINT publication_removal_notices_pkey PRIMARY KEY (id);


--
-- Name: published_items published_items_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.published_items
    ADD CONSTRAINT published_items_pkey PRIMARY KEY (id);


--
-- Name: publishers publishers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.publishers
    ADD CONSTRAINT publishers_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: UQ_maintenance_slug; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "UQ_maintenance_slug" ON public.maintenance USING btree (slug);


--
-- Name: admins_email_index; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX admins_email_index ON public.admins USING btree (email);


--
-- Name: admins_tokens_context_token_index; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX admins_tokens_context_token_index ON public.admins_tokens USING btree (context, token);


--
-- Name: admins_tokens_user_id_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX admins_tokens_user_id_index ON public.admins_tokens USING btree (user_id);


--
-- Name: apps_publisher_id_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX apps_publisher_id_index ON public.apps USING btree (publisher_id);


--
-- Name: item_creator_id_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX item_creator_id_index ON public.item USING btree (creator_id);


--
-- Name: item_path_index; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX item_path_index ON public.item USING btree (path);


--
-- Name: member_email_key1; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX member_email_key1 ON public.account USING btree (email);


--
-- Name: notification_logs_email_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX notification_logs_email_index ON public.notification_logs USING btree (email);


--
-- Name: notification_logs_notification_id_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX notification_logs_notification_id_index ON public.notification_logs USING btree (notification_id);


--
-- Name: notification_pixels_slug_index; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX notification_pixels_slug_index ON public.notification_pixels USING btree (slug);


--
-- Name: notifications_sent_at_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX notifications_sent_at_index ON public.notifications USING btree (sent_at);


--
-- Name: oban_jobs_args_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX oban_jobs_args_index ON public.oban_jobs USING gin (args);


--
-- Name: oban_jobs_meta_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX oban_jobs_meta_index ON public.oban_jobs USING gin (meta);


--
-- Name: oban_jobs_state_cancelled_at_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX oban_jobs_state_cancelled_at_index ON public.oban_jobs USING btree (state, cancelled_at);


--
-- Name: oban_jobs_state_discarded_at_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX oban_jobs_state_discarded_at_index ON public.oban_jobs USING btree (state, discarded_at);


--
-- Name: oban_jobs_state_queue_priority_scheduled_at_id_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX oban_jobs_state_queue_priority_scheduled_at_id_index ON public.oban_jobs USING btree (state, queue, priority, scheduled_at, id);


--
-- Name: publication_removal_notices_item_id_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX publication_removal_notices_item_id_index ON public.publication_removal_notices USING btree (item_id);


--
-- Name: published_items_creator_id_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX published_items_creator_id_index ON public.published_items USING btree (creator_id);


--
-- Name: admins_tokens admins_tokens_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.admins_tokens
    ADD CONSTRAINT admins_tokens_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.admins(id) ON DELETE CASCADE;


--
-- Name: apps apps_publisher_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.apps
    ADD CONSTRAINT apps_publisher_id_fkey FOREIGN KEY (publisher_id) REFERENCES public.publishers(id) ON DELETE CASCADE;


--
-- Name: localized_emails localized_emails_notification_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.localized_emails
    ADD CONSTRAINT localized_emails_notification_id_fkey FOREIGN KEY (notification_id) REFERENCES public.notifications(id) ON DELETE CASCADE;


--
-- Name: notification_logs notification_logs_notification_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.notification_logs
    ADD CONSTRAINT notification_logs_notification_id_fkey FOREIGN KEY (notification_id) REFERENCES public.notifications(id) ON DELETE CASCADE;


--
-- Name: notification_pixels notification_pixels_notification_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.notification_pixels
    ADD CONSTRAINT notification_pixels_notification_id_fkey FOREIGN KEY (notification_id) REFERENCES public.notifications(id) ON DELETE CASCADE;


--
-- Name: publication_removal_notices publication_removal_notices_creator_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.publication_removal_notices
    ADD CONSTRAINT publication_removal_notices_creator_id_fkey FOREIGN KEY (creator_id) REFERENCES public.admins(id) ON DELETE SET NULL;


--
-- Name: publication_removal_notices publication_removal_notices_item_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.publication_removal_notices
    ADD CONSTRAINT publication_removal_notices_item_id_fkey FOREIGN KEY (item_id) REFERENCES public.item(id) ON DELETE CASCADE;


--
-- Name: published_items published_items_creator_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.published_items
    ADD CONSTRAINT published_items_creator_id_fkey FOREIGN KEY (creator_id) REFERENCES public.account(id) ON DELETE CASCADE;


--
-- Name: published_items published_items_item_path_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.published_items
    ADD CONSTRAINT published_items_item_path_fkey FOREIGN KEY (item_path) REFERENCES public.item(path) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict ZmZAad8eEyGAJVsFy7iEIGmc0vY2uIQ8WDa2PmQpqaucjEYq2Le3UbU9tjv7rSL

INSERT INTO public."schema_migrations" (version) VALUES (20250806110912);
INSERT INTO public."schema_migrations" (version) VALUES (20250807113759);
INSERT INTO public."schema_migrations" (version) VALUES (20250818111736);
INSERT INTO public."schema_migrations" (version) VALUES (20250819070000);
INSERT INTO public."schema_migrations" (version) VALUES (20250828053810);
INSERT INTO public."schema_migrations" (version) VALUES (20250901102230);
INSERT INTO public."schema_migrations" (version) VALUES (20250902085812);
INSERT INTO public."schema_migrations" (version) VALUES (20250904060051);
INSERT INTO public."schema_migrations" (version) VALUES (20251014122320);
INSERT INTO public."schema_migrations" (version) VALUES (20251103104204);
INSERT INTO public."schema_migrations" (version) VALUES (20251103143048);
INSERT INTO public."schema_migrations" (version) VALUES (20251217123725);
INSERT INTO public."schema_migrations" (version) VALUES (20260110080411);
INSERT INTO public."schema_migrations" (version) VALUES (20260119072559);
INSERT INTO public."schema_migrations" (version) VALUES (20260205122108);
