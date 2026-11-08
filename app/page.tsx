"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";

type ElementItem = {
  id: number;
  type: "heading" | "text" | "button";
  content: string;
};

const themes = [
  { name: "Midnight", background: "#171522", accent: "#9875f5" },
  { name: "Lavender", background: "#211b31", accent: "#c5a5ff" },
  { name: "Ocean", background: "#14232d", accent: "#68bde9" },
  { name: "Rose", background: "#2b1c29", accent: "#ed91bc" },
  { name: "Forest", background: "#18271f", accent: "#8ac99b" },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("Canvas");
  const [theme, setTheme] = useState(themes[0]);
  const [device, setDevice] = useState("Desktop");
  const [selected, setSelected] = useState(1);
  const [saved, setSaved] = useState(false);

  const [elements, setElements] = useState<ElementItem[]>([
    { id: 1, type: "heading", content: "NO SWEAT" },
    { id: 2, type: "text", content: "Your next move, calculated." },
    { id: 3, type: "button", content: "Calculate" },
  ]);

  useEffect(() => {
    const stored = localStorage.getItem("nosweat-studio-design");

    if (stored) {
      try {
        const data = JSON.parse(stored);
        if (Array.isArray(data.elements)) setElements(data.elements);

        const matchingTheme = themes.find(
          (item) => item.name === data.theme
        );

        if (matchingTheme) setTheme(matchingTheme);
      } catch {
        // Use the default design if saved data is invalid.
      }
    }
  }, []);

  const current = elements.find((item) => item.id === selected);

  function updateText(content: string) {
    setElements((old) =>
      old.map((item) =>
        item.id === selected ? { ...item, content } : item
      )
    );
    setSaved(false);
  }

  function addElement(type: ElementItem["type"]) {
    const id = Date.now();

    const content =
      type === "heading"
        ? "New Heading"
        : type === "button"
        ? "New Button"
        : "New Text";

    setElements((old) => [...old, { id, type, content }]);
    setSelected(id);
    setActiveTab("Canvas");
    setSaved(false);
  }

  function deleteElement() {
    if (!current) return;

    setElements((old) => old.filter((item) => item.id !== selected));
    setSelected(0);
    setSaved(false);
  }

  function saveDesign() {
    localStorage.setItem(
      "nosweat-studio-design",
      JSON.stringify({ elements, theme: theme.name })
    );
    setSaved(true);
  }

  const buttonStyle: CSSProperties = {
    padding: "11px 14px",
    borderRadius: 9,
    border: "1px solid #49405e",
    background: "#302a40",
    color: "#f5f1ff",
    cursor: "pointer",
  };

  const panelStyle: CSSProperties = {
    background: "#201d2b",
    border: "1px solid #373143",
    borderRadius: 14,
    padding: 16,
  };

  return (
    <main style={{
      minHeight: "100vh",
      background: "#11101a",
      color: "#f5f1ff",
      fontFamily: "Arial, sans-serif",
    }}>
      <header style={{
        minHeight: 68,
        padding: "14px 20px",
        borderBottom: "1px solid #373143",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 12,
        flexWrap: "wrap",
      }}>
        <div>
          <strong style={{ color: "#bba2ff" }}>NO SWEAT</strong>
          <span style={{ color: "#9992a8", marginLeft: 10 }}>
            Design Studio
          </span>
        </div>

        <button
          onClick={saveDesign}
          style={{ ...buttonStyle, background: "#7655c9" }}
        >
          {saved ? "Saved ✓" : "Save Design"}
        </button>
      </header>

      <div style={{
        display: "grid",
        gridTemplateColumns: "minmax(0, 190px) minmax(0, 1fr)",
        minHeight: "calc(100vh - 68px)",
      }}>
        <aside style={{
          padding: 14,
          borderRight: "1px solid #373143",
        }}>
          <p style={{
            color: "#898297",
            fontSize: 11,
            letterSpacing: 2,
          }}>
            WORKSPACE
          </p>

          {["Canvas", "Templates", "Themes", "Components", "Assets"].map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  padding: 12,
                  marginBottom: 6,
                  borderRadius: 9,
                  border: "none",
                  color: "white",
                  cursor: "pointer",
                  background:
                    activeTab === tab ? "#493568" : "transparent",
                }}
              >
                {tab}
              </button>
            )
          )}

          <p style={{
            color: "#898297",
            fontSize: 11,
            letterSpacing: 2,
            marginTop: 28,
          }}>
            LAYERS
          </p>

          {elements.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setSelected(item.id);
                setActiveTab("Canvas");
              }}
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                padding: 9,
                marginBottom: 5,
                borderRadius: 7,
                border: "1px solid #373143",
                color: selected === item.id ? "#d5bdff" : "#c2bdcc",
                background:
                  selected === item.id ? "#302642" : "transparent",
                cursor: "pointer",
              }}
            >
              {item.type}
            </button>
          ))}
        </aside>

        <section style={{ padding: 20, minWidth: 0 }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
            marginBottom: 20,
          }}>
            <div>
              <h1 style={{ margin: 0, fontSize: 24 }}>
                Design Workspace
              </h1>
              <p style={{ color: "#9992a8", fontSize: 13 }}>
                Create and customize your interface.
              </p>
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              {["Mobile", "Desktop"].map((size) => (
                <button
                  key={size}
                  onClick={() => setDevice(size)}
                  style={{
                    ...buttonStyle,
                    background:
                      device === size ? "#7655c9" : "#302a40",
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {activeTab === "Canvas" && (
            <div style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1fr) minmax(210px, 260px)",
              gap: 16,
            }}>
              <div style={{
                ...panelStyle,
                minHeight: 430,
                background: "#181622",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "auto",
              }}>
                <div style={{
                  width: device === "Mobile" ? 300 : "100%",
                  maxWidth: 650,
                  minHeight: 340,
                  background: theme.background,
                  border: "1px solid #49405e",
                  borderRadius: 16,
                  padding: 28,
                  textAlign: "center",
                }}>
                  {elements.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setSelected(item.id)}
                      style={{
                        padding: 12,
                        marginBottom: 12,
                        borderRadius: 8,
                        border:
                          selected === item.id
                            ? `1px solid ${theme.accent}`
                            : "1px solid transparent",
                        cursor: "pointer",
                      }}
                    >
                      {item.type === "button" ? (
                        <span style={{
                          display: "inline-block",
                          background: theme.accent,
                          color: "#17101f",
                          padding: "12px 28px",
                          borderRadius: 9,
                          fontWeight: "bold",
                        }}>
                          {item.content}
                        </span>
                      ) : (
                        <span style={{
                          fontSize:
                            item.type === "heading" ? 27 : 15,
                          fontWeight:
                            item.type === "heading" ? "bold" : "normal",
                          color: "#f5f1ff",
                        }}>
                          {item.content}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div style={panelStyle}>
                <h3 style={{ marginTop: 0 }}>Properties</h3>

                {current ? (
                  <>
                    <p style={{ color: "#aaa2b8", fontSize: 13 }}>
                      Selected: {current.type}
                    </p>

                    <label style={{ fontSize: 13 }}>
                      Text content
                    </label>

                    <input
                      value={current.content}
                      onChange={(event) => updateText(event.target.value)}
                      style={{
                        width: "100%",
                        marginTop: 8,
                        padding: 11,
                        borderRadius: 8,
                        border: "1px solid #49405e",
                        background: "#15131e",
                        color: "white",
                      }}
                    />

                    <button
                      onClick={deleteElement}
                      style={{
                        ...buttonStyle,
                        marginTop: 14,
                        color: "#ffaaaa",
                      }}
                    >
                      Delete Element
                    </button>
                  </>
                ) : (
                  <p style={{ color: "#aaa2b8", fontSize: 13 }}>
                    Select an element on the canvas to edit it.
                  </p>
                )}
              </div>
            </div>
          )}

          {activeTab === "Templates" && (
            <div style={panelStyle}>
              <h2>Templates</h2>
              <p>Choose a starting point for your design.</p>
              <button
                onClick={() => {
                  setElements([
                    { id: 1, type: "heading", content: "NO SWEAT" },
                    { id: 2, type: "text", content: "A better way to calculate." },
                    { id: 3, type: "button", content: "Get Started" },
                  ]);
                  setSelected(1);
                  setSaved(false);
                  setActiveTab("Canvas");
                }}
                style={buttonStyle}
              >
                Load Starter Template
              </button>
            </div>
          )}

          {activeTab === "Themes" && (
            <div style={panelStyle}>
              <h2>Color Themes</h2>
              <p style={{ color: "#aaa2b8" }}>
                Change the appearance of your canvas.
              </p>

              <div style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 12,
              }}>
                {themes.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => {
                      setTheme(item);
                      setSaved(false);
                    }}
                    style={{
                      ...buttonStyle,
                      background: item.background,
                      border: `2px solid ${
                        theme.name === item.name
                          ? item.accent
                          : "#49405e"
                      }`,
                    }}
                  >
                    <span style={{
                      display: "inline-block",
                      width: 12,
                      height: 12,
                      background: item.accent,
                      borderRadius: "50%",
                      marginRight: 8,
                    }} />
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeTab === "Components" && (
            <div style={panelStyle}>
              <h2>Components</h2>
              <p style={{ color: "#aaa2b8" }}>
                Add elements to your canvas.
              </p>

              <div style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 10,
              }}>
                <button
                  onClick={() => addElement("heading")}
                  style={buttonStyle}
                >
                  + Heading
                </button>

                <button
                  onClick={() => addElement("text")}
                  style={buttonStyle}
                >
                  + Text
                </button>

                <button
                  onClick={() => addElement("button")}
                  style={buttonStyle}
                >
                  + Button
                </button>
              </div>
            </div>
          )}

          {activeTab === "Assets" && (
            <div style={panelStyle}>
              <h2>Assets</h2>
              <p style={{ color: "#aaa2b8" }}>
                Your image, icon, and font library will live here.
              </p>
              <p>Asset management is not connected yet.</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}