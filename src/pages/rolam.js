/** @jsx jsx */
import { jsx, css } from "@emotion/core"
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
      <SEO title={`Rólam`} pathname={`/rolam/`} website={true} description={"Bemutatkozom: Gulácsi András vagyok, frontend fejlesztőnek és UI/UX designernek tanulok..."} />
      <Header>
        <NavLink to="/">Főoldal</NavLink>
        <NavLink to="/rolam/">
          Rólam <span className="sr-only">(aktuális)</span>
        </NavLink>
        <NavLink to="/kapcsolat/">Kapcsolat</NavLink>
      </Header>
      <Row>
        <div className="col-12 col-sm-12 col-md-12 col-lg-10 col-xl-9 p0 mt2">
          <Breadcrumb>Rólam</Breadcrumb>
          <h1>Rólam</h1>
          <hr></hr>
          <p>
            Frontend fejlesztőnek és UI/UX/webdesignernek tanulok,
            végzettségemet tekintve környezettudós és geográfus vagyok. A
            szabadidőmben időszakosan táncot oktatok és persze tanulok, tanulok
            és tanulok.
          </p>
          <p>
            Amikor egyetemre mentem, azt gondoltam naívan, hogy vár rám ott
            valamilyen jövő, de tévedtem. Óriási hiba volt, amit azóta próbálok
            kijavítani. Jelenleg PhD hallgató vagyok kényszerből. Alig várom,
            hogy otthagyhassam.
          </p>

          <h2>A webes életutam</h2>
          <p>
            2016. január elején elkezdtem frontend fejlesztést tanulni magamtól.
            Elsőnek HTML-t, CSS-t, majd JavaScript-et tanultam. Később jQuery-t
            és a Bootstrap 3-4-et is hozzávettem. Korábbról volt egy kis
            tapasztalatom a C nyelvvel is, amit műholdas adatok automatizált
            feldolgozása során használtam néhány batch szkripten felül. Szintén
            rendelkezem SQL adatbázis alapokkal, mint általában mindenki a web
            területén.
          </p>

          <p>
            Ezután következett a Node.js. Írtam egy statikus oldalgenerátort
            Node-ban, amivel korábban az összes statikus weboldalamat
            készítettem. Most beújítottam a Gatsby.js-sel. Ez a honlap már ezzel
            készült. Az oldalaimat a Netlify felhőplatform szolgáltatja. Nem
            kétséges, nagy rajongója vagyok a JAMstack-nak. Ezen felül
            rendelkezem némi alapvető Angular 2 tudással. Amit a jövőben ki
            szeretnék bővíteni.
          </p>

          <p>
            2018 elején lépett be az életembe a felhasználói élmény /
            felhasználói felületek tervezése. 2018 őszén sikeresen elvégeztem az
            UXstudio Digital Product Design kurzusát Budapesten. Az Udemy
            kurzusaiból tanulok. Pillanatnyilag nekikezdtem a TypeScript-nek és
            az Angular 2+-nak és a Gatsby-nek. Nagy rajongója lettem most a
            Gatsby-nak és a GraphQL-nek.
          </p>

          <h2>Válogatott publikációim</h2>
          {publications.edges.map(publication => (
            <div
              key={publication.node.mtid}
              css={css`
                background-color: #fffffe;
                border-radius: 2px;
              `}
              className="phalf mb1"
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
                <h3 className="h4 mt0" css={css`letter-spacing: 1px; line-height: 130%;`}>{publication.node.title}</h3>
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
