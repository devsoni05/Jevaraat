const Imagecrousel = () => {
  return (
    <div className="container">
      <br />
      <br />
      <br />
      <br />
      <div className="row">
        <div className="col mt-4 mb-5 d-flex justify-content-center">
          <div
            id="customCarousel"
            className="carousel slide"
            data-bs-ride="carousel"
            style={{
              width: "100%",
              height: "75vh",
              borderRadius: "15px",
              overflow: "hidden",
              //boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
              opacity: "0.8",
            }}
          >
            {/* Indicators */}
            <div className="carousel-indicators">
              {items.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  data-bs-target="#customCarousel"
                  data-bs-slide-to={index}
                  className={index === 0 ? "active" : ""}
                ></button>
              ))}
            </div>

            {/* Slides */}
            <div className="carousel-inner h-100">
              {items.map((item, index) => (
                <div
                  key={index}
                  className={`carousel-item ${index === 0 ? "active" : ""} h-100`}
                >
                  <img
                    src={item.url}
                    className="d-block w-100 h-100"
                    alt={item.label}
                    style={{ objectFit: "cover" }}
                  />
                </div>
              ))}
            </div>

            {/* Controls */}
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#customCarousel"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon"></span>
            </button>

            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#customCarousel"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const items = [
  {
    label: "Mountain Landscape",
    url: "https://images.pexels.com/photos/13595689/pexels-photo-13595689.jpeg",
  },
  {
    label: "Forest Path",
    url: "https://images.pexels.com/photos/4595723/pexels-photo-4595723.jpeg",
  },
  {
    label: "Ocean Waves",
    url: "https://images.pexels.com/photos/5737290/pexels-photo-5737290.jpeg",
  },
  {
    label: "Desert Dunes",
    url: "https://images.pexels.com/photos/1670723/pexels-photo-1670723.jpeg",
  },
  {
    label: "Sunset Lake",
    url: "https://images.pexels.com/photos/9565894/pexels-photo-9565894.jpeg",
  },
];

export default Imagecrousel;
