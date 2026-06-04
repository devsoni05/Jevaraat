function Review() {
  return (
    <div className="container mt-5 p-5">
      <hr />
      <h3 className="mb-5 mt-5">Leave a Review</h3>

      <div className="form-floating mb-3">
        <textarea
          className="form-control"
          placeholder="Leave a comment here"
          id="floatingTextarea2"
          style={{ height: "120px" }}
        ></textarea>
        <label htmlFor="floatingTextarea2">Share Your Review</label>
      </div>

      <button className="btn btn-dark mt-5">Submit Review</button>
    </div>
  );
}

export default Review;
