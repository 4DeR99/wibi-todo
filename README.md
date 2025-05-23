## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## First step

Please go ahead and create the users from https://recruter-backend.vercel.app/docs/
the users created from the api get cleared after a certain time so providing one here is not gonna work.

## after

after login in with your user you will be automatically navigated to /home 
not / since its for landing pages and we don't have one

## please note

I wasn't working on this full time since I was busy with other work but over all some things I noticed:

 - Should be username in the login page instead of email
 - There is no /users/me (very important!!!) route to confirm if user is logged in so I had to use a workaround, basically I used the token saved in the local storage and sent a get request to /api/taks to check if the token is valid, and I also saved the role and username in localstorage.
 - It could've been better to provide the api repo for us to clone and run locally, it was verry annoying to deal with other guys perma deleting tasks and playing with them.
 - for some reason the get tasks end keep sending back empty array and goes back to normal every now and then.
