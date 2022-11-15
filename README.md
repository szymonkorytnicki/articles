# FOMO

Tool to turn your datapoints on Beeminder into a blog.

## How to run it

1. Clone repo
2. Fill .env file
3. `node generateData.mjs`
4. `npm run dev`

## How to deploy it

Either deploy to Vercel or self host.

To self host, `next export` or `next build` will generate code for you.

To host on Vercel, create new project and import your repo. Make sure to fill env variables.

## I added a datapoint, my blog is not reflecting it

Run `node generateData.mjs` or `npm run build`

## I deployed on Vercel, I want to have redeploy on new datapoint

Add Vercel deployment webhook in beeminder goal settings (PESOS webhook)

## How do I add new posts?

Call yourwebsite/api/add with POST request and headers: title, content, tags, category, rating and auth_token.
auth_token is your beeminder token.

You might use iOS shortcuts or Postman as your GUI.
