set client_min_messages to warning;

drop schema "public" cascade;
create schema "public";

CREATE TABLE "public"."users" (
	"userId" serial NOT NULL,
	"displayName" TEXT NOT NULL,
	"profilePhoto" TEXT NOT NULL,
	"email" TEXT NOT NULL UNIQUE,
	"dateOfBirth" DATE NOT NULL,
	"password" TEXT NOT NULL,
	"createdAt" TIMESTAMPTZ NOT NULL default now(),
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "public"."runs" (
	"entryId" serial NOT NULL,
	"title" TEXT NOT NULL,
	"description" TEXT NOT NULL,
	"date" DATE NOT NULL,
	"duration" TIME NOT NULL,
	"distance" REAL NOT NULL,
  "distanceUnits" TEXT NOT NULL,
	"hasGpx" BOOLEAN NOT NULL,
	"createdAt" TIMESTAMPTZ NOT NULL default now(),
	"userId" integer NOT NULL,
	CONSTRAINT "runs_pk" PRIMARY KEY ("entryId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "public"."gpxData" (
	"gpxDataId" serial NOT NULL,
	"userId" integer NOT NULL,
	"entryId" integer NOT NULL,
	"latitude" TEXT NOT NULL,
	"longitude" TEXT NOT NULL,
	"elevation" TEXT NOT NULL,
  "time" TIMESTAMPTZ NOT NULL,
  "createdAt" TIMESTAMPTZ NOT NULL default now(),
	CONSTRAINT "gpxData_pk" PRIMARY KEY ("gpxDataId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "public"."workouts" (
	"workoutId" serial NOT NULL,
	"date" DATE NOT NULL,
	"description" TEXT NOT NULL,
  "warmupDistance" REAL NOT NULL,
  "warmupDistanceUnits" TEXT NOT NULL,
  "warmupNotes" TEXT NOT NULL,
  "workoutDistance" REAL NOT NULL,
  "workoutDistanceUnits" TEXT NOT NULL,
  "workoutNotes" TEXT NOT NULL,
  "cooldownDistance" REAL NOT NULL,
  "cooldownDistanceUnits" TEXT NOT NULL,
  "cooldownNotes" TEXT NOT NULL,
	"createdAt" TIMESTAMPTZ NOT NULL default now(),
	"userId" integer NOT NULL,
	CONSTRAINT "workouts_pk" PRIMARY KEY ("workoutId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "public"."restDays" (
	"restId" serial NOT NULL,
	"date" DATE NOT NULL,
  "isCustom" BOOLEAN NOT NULL,
  "isWeeklyDay" BOOLEAN NOT NULL,
	"userId" integer NOT NULL,
	CONSTRAINT "restDays_pk" PRIMARY KEY ("restId")
) WITH (
  OIDS=FALSE
);

ALTER TABLE "runs" ADD CONSTRAINT "runs_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "gpxData" ADD CONSTRAINT "gpxData_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "gpxData" ADD CONSTRAINT "gpxData_fk1" FOREIGN KEY ("entryId") REFERENCES "runs"("entryId");
ALTER TABLE "workouts" ADD CONSTRAINT "workouts_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "restDays" ADD CONSTRAINT "restDays_pk" FOREIGN KEY ("userId") REFERENCES "users"("userId");
