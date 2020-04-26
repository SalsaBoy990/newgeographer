/** @jsx jsx */
import { jsx, css } from "@emotion/core"
// eslint-disable-next-line no-unused-vars
import React from "react"
import { graphql } from "gatsby"

import SEO from "../components/seo"
import Container from "../components/container/container.js"
import Row from "../components/row/row.js"
import Breadcrumb from "../components/breadcrumb/breadcrumb.js"
import Header from "../components/header/header.js"
import Footer from "../components/footer/footer.js"
import NavLink from "../components/nav-link/nav-link.js"

const AboutPage = ({ data }) => {
  const publications = data.allPublication
  // console.log(publications)
  return (
    <Container>
      <SEO
        title={`Rólam`}
        pathname={`/rolam/`}
        website={true}
        description={
          "Bemutatkozom: Gulácsi András vagyok, frontend fejlesztőnek és UI/UX designernek tanulok..."
        }
      />
      <Header>
        <NavLink to="/">Főoldal</NavLink>
        <NavLink to="/rolam/">
          Rólam <span className="sr-only">(aktuális)</span>
        </NavLink>
        <NavLink to="/kapcsolat/">Kapcsolat</NavLink>
      </Header>
      <Row>
        <div className="col-12 col-sm-12 col-md-12 col-lg-10 offset-lg-1 col-xl-9 p0 mt2">
          <Breadcrumb>Rólam</Breadcrumb>
          <h1>Rólam</h1>

          <p>
            Frontend fejlesztőnek és UI/UX/webdesignernek tanulok,
            végzettségemet tekintve környezettudós és geográfus vagyok. A
            szabadidőmben időszakosan táncot oktatok és persze tanulok, tanulok
            és tanulok.
          </p>
          <p>
            Amikor egyetemre mentem, azt gondoltam naívan, hogy vár rám ott
            valamilyen jövő, de tévedtem. Óriási hiba volt, amit azóta próbálok
            kijavítani. Jelenleg PhD hallgató vagyok kényszerből.
          </p>

          <h2>A webes életutam</h2>
          <p>
            2016. január elején elkezdtem frontend fejlesztést tanulni magamtól.
            Elsőnek HTML-t, CSS-t, majd JavaScript-et tanultam. Később jQuery-t
            és a Bootstrap 3-4-et is hozzávettem. Korábbról volt egy kis
            tapasztalatom a C nyelvvel is. Szintén rendelkezem SQL
            adatbázis-kezelés alapokkal.
          </p>

          <p>
            Ezután következett a Node.js. Írtam egy statikus oldalgenerátort
            Node-ban, amivel korábban az összes statikus weboldalamat
            készítettem. Azóta áttértem a Gatsby.js-re. A statikus oldalaimat a
            Netlify felhőplatform szolgáltatja. Ezen felül rendelkezem kezdő
            Angular 2+ tudással, amit a jövőben ki szeretnék bővíteni. Jelenleg
            a Wordpress fejlesztést tanulom, hogy webalkalmazásokat és
            webáruházakat (WooCommerce) tudjak készíteni komolyabb backend tudás nélkül.
          </p>

          <p>
            2018 elején lépett be az életembe a felhasználói élmény /
            felhasználói felületek tervezése. 2018 őszén sikeresen elvégeztem az
            UXstudio Digital Product Design kurzusát Budapesten. Az Udemy
            kurzusaiból tanulok.
          </p>

          <h2>Válogatott publikációim</h2>
          <div className="mb1">
            {publications.edges.map(publication => (
              <div
                key={publication.node.mtid}
                css={css`
                  background-color: #fffffe;
                  border-radius: 2px;
                `}
                className="phalf mb0"
              >
                <p
                  className="small-size mb0"
                  css={css`
                    color: #515958;
                  `}
                >
                  {publication.node.authorships.map((author, index) => (
                    <span key={`${author.author.familyName}/${index}`}>
                      <span>{`${author.author.familyName} ${author.author.givenName}`}</span>
                      {index === publication.node.authorships.length - 1
                        ? ""
                        : " – "}
                    </span>
                  ))}
                </p>

                <a
                  href={publication.node.oaLink}
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  <h3
                    className="h4 mt0"
                    css={css`
                      line-height: 130%;
                    `}
                  >
                    {publication.node.title}
                  </h3>
                </a>
                <p
                  css={css`
                    color: #687270;
                  `}
                  className="min-size mb0"
                >
                  {`
                ${publication.node.journal.label.replace(/[(0-9)]\w\d\S+/g, "")}
                ${publication.node.volume}(${publication.node.issue})`}
                  {publication.node.firstPage || publication.node.lastPage
                    ? `, pp. ${publication.node.firstPage}–${publication.node.lastPage}.`
                    : ``}
                </p>
                <span
                  css={css`
                    color: #999;
                  `}
                  className="small-size"
                >
                  {publication.node.publishedYear}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Row>
      <Footer></Footer>
    </Container>
  )
}

export const query = graphql`
  query GetPublicationsQuery {
    allPublication(filter: { otype: { eq: "JournalArticle" } }) {
      edges {
        node {
          mtid
          publishedYear
          title
          independentCitationCount
          journal {
            label
          }
          authorships {
            author {
              familyName
              givenName
            }
          }
          volume
          issue
          volume
          firstPage
          lastPage
          oaLink
        }
      }
    }
  }
`

export default AboutPage
