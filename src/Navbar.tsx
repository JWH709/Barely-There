import React, { useState } from "react";

const Navbar = () => {
  const links = [
    [
      { title: "Birch Beer", url: "" },
      { title: "Already Dead", url: "" },
      { title: "El Toro", url: "" },
      { title: "Kerosene", url: "" },
      { title: "Gallery", url: "" },
      { title: "Monroe", url: "" },
      { title: "Intern", url: "" },
      { title: "WIREMOUTH", url: "" },
      { title: "Hollow Grave", url: "" },
      { title: "Swimming", url: "" },
      { title: "CaT CaFé", url: "" },
      { title: "Bugfight", url: "" },
    ],
    [
      {
        title: "Bandcamp",
        url: "https://barelythererecords.bandcamp.com/",
      },
      {
        title: "Instagram",
        url: "https://www.instagram.com/barelytheremedia/",
      },
    ],
  ];
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Barely There
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <Dropdown title="Artists" items={links[0]} />
              <Dropdown title="Links" items={links[1]} />
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Contact
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Merch
                </a>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};

interface LinkProps {
  title: string;
  url: string;
}
interface DropDownProps {
  title: string;
  items: LinkProps[];
}

const Dropdown = (props: DropDownProps) => {
  //Dropdown functionality. Appears on hover.
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };
  //functions for grid:

  const testStorage: { title: string; url: string }[][] = [];

  function getRows(items): void {
    const numberOfRows: number = Math.round(items.length / 3);

    for (let i = 0; i < numberOfRows; i++) {
      const isFirstRow: boolean = i === 0;
      const bandBenchmark: number = testStorage[0]?.length * i || 0;

      testStorage.push(
        isFirstRow
          ? [items[i], items[i + 1], items[i + 2]].filter(
              (item) => item !== undefined
            )
          : [
              items[bandBenchmark],
              items[bandBenchmark + 1],
              items[bandBenchmark + 2],
            ].filter((item) => item !== undefined)
      );
    }

    let itemTotal: number = 0;
    for (let i = 0; i < testStorage.length; i++) {
      itemTotal += testStorage[i].length;
    }

    if (itemTotal < items.length) {
      testStorage.push([items[itemTotal]]);
    }
  }

  //is list or grid?:

  if (props.items.length < 4)
    return (
      <>
        <li
          className="nav-item dropdown"
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          <a
            className="nav-link dropdown-toggle"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded={isHovered}
          >
            {props.title}
          </a>
          <ul
            className={`dropdown-menu ${isHovered ? "show" : ""}`}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            {props.items.map((item, index) => (
              <React.Fragment key={index}>
                <li>
                  <a className="dropdown-item" href={item.url} target="_blank">
                    {item.title}
                  </a>
                </li>
                {index < props.items.length - 1 && (
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                )}
              </React.Fragment>
            ))}
          </ul>
        </li>
      </>
    );
  else
    return (
      <>
        <li
          className="nav-item dropdown"
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          <a
            className="nav-link dropdown-toggle"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded={isHovered}
          >
            {props.title}
          </a>
          <div
            className={`dropdown-menu container text-center ${
              isHovered ? "show" : ""
            }`}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            <div className="container text-center">
              {props.items.map((item, index) => (
                <React.Fragment key={index}>
                  <div className="row row-cols-3">
                    <div className="col">{item.title}</div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </li>
      </>
    );
};

export default Navbar;
