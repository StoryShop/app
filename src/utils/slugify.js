/* converts a phrase into a slug
   separates words with dashes
   caps length at 30 characters */
export default phrase => {
  return phrase
    .trim()
    .toLowerCase()
    .replace(/\s{1,}/g, "-")
    .slice(0, 70)
}
