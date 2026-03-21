import { groq } from "next-sanity";

export const personQuery = groq`*[_type == "person"][0]`;

export const featuredProjectsQuery = groq`*[_type == "project" && featured == true] | order(order asc)`;

export const experiencesQuery = groq`*[_type == "experience"] | order(order asc)`;

export const allProjectsQuery = groq`*[_type == "project"] | order(order asc)`;

export const allArticlesQuery = groq`*[_type == "article"] | order(date desc)`;

export const allAwardsQuery = groq`*[_type == "award"] | order(date desc)`;
