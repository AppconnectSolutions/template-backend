import React from "react";

const Wishlist = () => {
  return (
    <main>
      {/* Section - Breadcrumb */}
      

      {/* Section - Wishlist Table */}
      <section className="mt-8 mb-14">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="mb-8">
                <h1 className="mb-1">My Wishlist</h1>
                <p>There are 5 products in this wishlist.</p>
              </div>

              <div className="table-responsive">
                <table className="table text-nowrap table-with-checkbox">
                  <thead className="table-light">
                    <tr>
                      <th>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="checkAll"
                          />
                          <label className="form-check-label" htmlFor="checkAll"></label>
                        </div>
                      </th>
                      <th></th>
                      <th>Product</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Actions</th>
                      <th>Remove</th>
                    </tr>
                  </thead>

                  <tbody>
                    {/* ITEM 1 */}
                    <tr>
                      <td className="align-middle">
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" id="c2" />
                          <label className="form-check-label" htmlFor="c2"></label>
                        </div>
                      </td>

                      <td className="align-middle">
                        <a href="#">
                          <img
                            src="../assets/images/products/product-img-18.jpg"
                            className="icon-shape icon-xxl"
                            alt=""
                          />
                        </a>
                      </td>

                      <td className="align-middle">
                        <div>
                          <h5 className="fs-6 mb-0">
                            <a href="#" className="text-inherit">
                              Organic Banana
                            </a>
                          </h5>
                          <small>$.98 / lb</small>
                        </div>
                      </td>

                      <td className="align-middle">$35.00</td>
                      <td className="align-middle">
                        <span className="badge bg-success">In Stock</span>
                      </td>

                      <td className="align-middle">
                        <div className="btn btn-primary btn-sm">Add to Cart</div>
                      </td>

                      <td className="align-middle">
                        <a href="#" className="text-muted" title="Delete">
                          <i className="feather-icon icon-trash-2"></i>
                        </a>
                      </td>
                    </tr>

                    {/* ITEM 2 */}
                    <tr>
                      <td className="align-middle">
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" id="c3" />
                          <label className="form-check-label" htmlFor="c3"></label>
                        </div>
                      </td>

                      <td className="align-middle">
                        <a href="#">
                          <img
                            src="../assets/images/products/product-img-17.jpg"
                            className="icon-shape icon-xxl"
                            alt=""
                          />
                        </a>
                      </td>

                      <td className="align-middle">
                        <div>
                          <h5 className="fs-6 mb-0">
                            <a href="#" className="text-inherit">
                              Fresh Kiwi
                            </a>
                          </h5>
                          <small>4 no</small>
                        </div>
                      </td>

                      <td className="align-middle">$20.97</td>
                      <td className="align-middle">
                        <span className="badge bg-danger">Out of Stock</span>
                      </td>

                      <td className="align-middle">
                        <div className="btn btn-dark btn-sm">Contact us</div>
                      </td>

                      <td className="align-middle">
                        <a href="#" className="text-muted">
                          <i className="feather-icon icon-trash-2"></i>
                        </a>
                      </td>
                    </tr>

                    {/* ITEM 3 */}
                    <tr>
                      <td className="align-middle">
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" id="c4" />
                          <label className="form-check-label" htmlFor="c4"></label>
                        </div>
                      </td>

                      <td className="align-middle">
                        <a href="#">
                          <img
                            src="../assets/images/products/product-img-16.jpg"
                            className="icon-shape icon-xxl"
                            alt=""
                          />
                        </a>
                      </td>

                      <td className="align-middle">
                        <div>
                          <h5 className="fs-6 mb-0">
                            <a href="#" className="text-inherit">
                              Golden Pineapple
                            </a>
                          </h5>
                          <small>2 no</small>
                        </div>
                      </td>

                      <td className="align-middle">$35.00</td>
                      <td className="align-middle">
                        <span className="badge bg-success">In Stock</span>
                      </td>

                      <td className="align-middle">
                        <div className="btn btn-primary btn-sm">Add to Cart</div>
                      </td>

                      <td className="align-middle">
                        <a href="#" className="text-muted">
                          <i className="feather-icon icon-trash-2"></i>
                        </a>
                      </td>
                    </tr>

                    {/* ITEM 4 */}
                    <tr>
                      <td className="align-middle">
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" id="c5" />
                          <label className="form-check-label" htmlFor="c5"></label>
                        </div>
                      </td>

                      <td className="align-middle">
                        <a href="#">
                          <img
                            src="../assets/images/products/product-img-19.jpg"
                            className="icon-shape icon-xxl"
                            alt=""
                          />
                        </a>
                      </td>

                      <td className="align-middle">
                        <div>
                          <h5 className="fs-6 mb-0">
                            <a href="#" className="text-inherit">
                              BeatRoot
                            </a>
                          </h5>
                          <small>1 kg</small>
                        </div>
                      </td>

                      <td className="align-middle">$29.00</td>
                      <td className="align-middle">
                        <span className="badge bg-success">In Stock</span>
                      </td>

                      <td className="align-middle">
                        <div className="btn btn-primary btn-sm">Add to Cart</div>
                      </td>

                      <td className="align-middle">
                        <a href="#" className="text-muted">
                          <i className="feather-icon icon-trash-2"></i>
                        </a>
                      </td>
                    </tr>

                    {/* ITEM 5 */}
                    <tr>
                      <td className="align-middle">
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" id="c6" />
                          <label className="form-check-label" htmlFor="c6"></label>
                        </div>
                      </td>

                      <td className="align-middle">
                        <a href="#">
                          <img
                            src="../assets/images/products/product-img-15.jpg"
                            className="icon-shape icon-xxl"
                            alt=""
                          />
                        </a>
                      </td>

                      <td className="align-middle">
                        <div>
                          <h5 className="fs-6 mb-0">
                            <a href="#" className="text-inherit">
                              Fresh Apple
                            </a>
                          </h5>
                          <small>2 kg</small>
                        </div>
                      </td>

                      <td className="align-middle">$70.00</td>
                      <td className="align-middle">
                        <span className="badge bg-success">In Stock</span>
                      </td>

                      <td className="align-middle">
                        <div className="btn btn-primary btn-sm">Add to Cart</div>
                      </td>

                      <td className="align-middle">
                        <a href="#" className="text-muted">
                          <i className="feather-icon icon-trash-2"></i>
                        </a>
                      </td>
                    </tr>

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Wishlist;
