import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions/index";

export default function Detail(props) {
  const dispatch = useDispatch();

  const { id } = props.match.params;

  useEffect(() => {
    dispatch(getDetail(id));
  }, []);
  const detail = useSelector((state) => state.detail);

  /*  const platforms = detail.platforms.map((p) => p.platform.name); */
  return (
    <div>
      <Link to="/home">
        <button>Home</button>
      </Link>
      <h1>{detail.name}</h1>
      <img
        src={detail.background_image}
        alt="img not found"
        width="600px"
        height="340px"
      />
      <h2>Released date: {detail.released}</h2>
      <h2>Platforms:</h2>
      {/*   <h5>{detail.platforms.map((p) => p.platform.name).join(", ")}</h5> */}
      <h5>Rating :{detail.rating}</h5>

      <p>{detail.description_raw}</p>
    </div>
  );
}
