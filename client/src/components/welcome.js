import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
  <div>

    { /*Main jumbotron for a primary marketing message or call to action*/}
    <div className="container">
      <h1 className="display-4">Welcome to my blog!</h1>
      <p><Link className="btn btn-outline-light btn-lg" to="/posts" role="button">Check out the blog posts &raquo;</Link></p>
    </div>

    { /*Example row of columns*/}
    <div className="row text-justify">
      <div className="col-md-4 card cell-1">

      </div>
      <div className="col-md-4 card cell-2">

      </div>
      <div className="col-md-4 card cell-3">

      </div>
    </div>
  </div>
);