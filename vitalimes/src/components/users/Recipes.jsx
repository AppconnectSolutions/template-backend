


// src/components/Recipes.jsx
import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Recipes() {
  const base =
    typeof process !== "undefined" && process.env && process.env.PUBLIC_URL
      ? process.env.PUBLIC_URL
      : "";

  const recipes = [
    { img: `/assets/images/recepies/lemon_rice.png`, title: "Lemon Rice", description: "A flavorful and tangy rice dish", href: "#!" },
    { img: `/assets/images/recepies/cake.png`, title: "Green Juice", description: "A refreshing green juice with lemon", href: "#!" },
    { img: `/assets/images/recepies/lemon_tea.png`, title: "Healthy Dish", description: "A healthy, balanced dish", href: "#!" },
    { img: `/assets/images/recepies/meat.png`, title: "Oil Dish", description: "A special dish made with organic oil", href: "#!" },
    // { img: `/assets/images/chutney.png`, title: "Chutney", description: "Spicy and tangy chutney", href: "#!" },
    // { img: `/assets/images/recepies/lemon_juice.png`, title: "Fresh Juice", description: "Pure fresh lemon juice", href: "#!" },
    
  ];

  return (
    <section style={{ padding: "2rem 0", background: "#f8f8f8" }}>
      <Container>
        <h3 className="text-center mb-4" style={{ fontWeight: "700" }}>
          Recipes
        </h3>

        <Row className="justify-content-center g-4">
          {recipes.map((recipe, i) => (
            <Col
              key={i}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              className="d-flex justify-content-center"
            >
              <Card
                style={{
                  width: "100%",
                  border: "none",
                  borderRadius: "15px",
                  overflow: "hidden",
                  boxShadow: "0 10px 35px rgba(0,0,0,0.12)",
                  transition: "0.3s ease",
                }}
                className="recipe-card"
              >
                <Card.Img
                  src={`${base}${recipe.img}`}
                  style={{
                    height: "320px",
                    width: "100%",
                    objectFit: "cover",
                  }}
                />

                <Card.Body style={{ padding: "1rem" }}>
                  <Card.Title
                    style={{ fontWeight: "600", fontSize: "1.05rem" }}
                  >
                    {recipe.title}
                  </Card.Title>

                  <Card.Text style={{ fontSize: "0.9rem", color: "#666" }}>
                    {recipe.description}
                  </Card.Text>

                  {/* <a href={recipe.href} style={{ textDecoration: "none" }}>
                    <button
                      className="btn btn-success"
                      style={{
                        width: "100%",
                        borderRadius: "8px",
                        fontWeight: "600",
                      }}
                    >
                      View Recipe
                    </button>
                  </a> */}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* CSS Inside Component */}
      <style>{`
        .recipe-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 18px 45px rgba(0,0,0,0.18);
        }

        @media (max-width: 576px) {
          .recipe-card img {
            height: 260px !important;
          }
        }
      `}</style>
    </section>
  );
}