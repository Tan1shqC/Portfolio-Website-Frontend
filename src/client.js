import {createClient} from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
    projectId: process.env.REACT_APP__SANITY_PROJECT_ID,
    dataset: "production",
    apiVersion: "2023-10-05",
    useCdn: true,
    token: process.env.REACT_APP__SANITY_TOKEN
});

const builder = imageUrlBuilder(client);

export const urlFor = (src) => builder.image(src);