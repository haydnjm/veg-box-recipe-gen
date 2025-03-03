# Doosie

A recipe assistant that emails you new healthy recipes each week, helping you plan your weekly meals and generate shopping lists.

From the Dutch "doosje", meaning "box", as in your weekly recipe box!
![email preview of tofu noodles](assets/cover.png)

## Features

- Automated weekly recipe suggestions
- Email delivery every Saturday morning
- App for managing shopping lists/viewing recipe instructions (TODO)

## Pre-reqs

- [Supabase](https://supabase.com/) project for DB + auth
- [Resend](https://resend.com/) account for sending emails
- [Google Gemini API key](https://ai.google.dev/gemini-api/docs/quickstart) for recipe generation
- [Stability AI API key and credits](https://stability.ai/api) for image generation
- [GitHub Account](https://github.com/) for GitHub Actions if you want to deploy it

## Environment Variables

Create a `.env` file in the root directory with the following variables:

| Variable                 | Description                           | Required | Default |
| ------------------------ | ------------------------------------- | -------- | ------- |
| SUPABASE_URL             | Your Supabase project URL             | Yes      | -       |
| SUPABASE_SERVICE_API_KEY | Supabase service role API key         | Yes      | -       |
| SUPABASE_ANON_API_KEY    | Supabase anonymous API key            | Yes      | -       |
| RESEND_API_KEY           | API key for email service (Resend)    | Yes      | -       |
| GEMINI_API_KEY           | Google Gemini API key for AI features | Yes      | -       |
| STABILITY_API_KEY        | Stability AI API key                  | Yes      | -       |
| STABILITY_API_MODEL      | Stability AI model name               | No       | "core"  |

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Create .env file

```bash
cp .env.example .env
```

Use the table above to help populate the env file

### 3. Configure Supabase

Connect to your remote supabase project

```bash
supabase init
```

```bash
supabase link
```

There is a migration file [here](supabase/migrations/20250225171720_init.sql) which will set up the database table and necessary RLS policies. You apply it with the following command:

```bash
supabase db push
```

#### Setting up storage

You must also create a new public bucket in both you local and remote supabase instances. Sadly there's no clean way to manage this with migrations yet (that I have found)

1. Go to Supabase Studio, then to Storage, and click "New bucket".
2. Check "Public", give the bucket a name, confirm to create the bucket
3. Click "Policies", add a policy to `INSERT` to the `anon` profile

The bucket must be public or you will not be able to view the images from the recipe emails or front-end (when that arrives...).

### 4. Configure Resend

You must verify that you own the domain that you wish to send the recipe emails from. You can do this from the [Resend dashboard](https://resend.com/domains).

### 4. Run the app

```bash
npm run start
```

### 5. Deploy the app (if you want)

When pushed to a github repository this project will run on the schedule defined in the on Saturday mornings at 4am.

First you must add all environment variables to your repository settings (Settings > Secrets and Variables > Actions).

You can update the schedule in the [workflow file](.github/workflows/schedule.yaml)

# Todos:

- [ ] Front end which fetches shopping list
- [ ] Auth, multi-user lists
