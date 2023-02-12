import Head from "next/head";

import licenses from "./licenses.json";

export default function Licenses() {
  return (
    <>
      <Head>
        <title>Licenses</title>
        <meta
          name="description"
          content="Licenses for software used in Leagueify"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>
      <h2>Open Source Licenses</h2>
      <p>
        THE FOLLOWING THIRD PARTY SOFTWARE COMPONENTS MAY BE CONTAINED IN
        PORTIONS OF LEAGUEIFY.
      </p>
      {Object.keys(licenses).map((value, key: number) => {
        const license = licenses[key];
        return (
          <div key={key}>
            <h2>
              {license.name} - {license.license}
            </h2>
          </div>
        );
      })}
    </>
  );
}
