# Project Architecture Rules

- Store reusable public wish cards and anonymous aggregate engagement events in Lovable Cloud; gate private reporting through the separate `user_roles` table so share links remain public without exposing analytics data.