const postQuery = `{
  posts: allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/posts/"}}) {
    edges {
      node {
        objectID: id
        frontmatter {
          title
          date(locale: "hu", formatString: "YYYY. MMMM D.")
          tags
        }
        excerpt(pruneLength: 5000)
        fields {
          slug
        }
      }
    }
  }
}`


const flatten = arr =>
  arr.map(({ node: { frontmatter, ...rest } }) => ({
    ...frontmatter,
    ...rest,
  }))
const settings = { attributesToSnippet: [`excerpt:20`] }

const queries = [
  {
    query: postQuery,
    transformer: ({ data }) => flatten(data.posts.edges),
    indexName: `Posts`,
    settings,
  },
]

module.exports = queries
