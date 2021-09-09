import React, { useEffect } from "react";
import { Link, _useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions/index";

export default function Detail(props) {
  const dispatch = useDispatch();

  const { id } = props.match.params;

  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch]);
  const detail = useSelector((state) => state.detail);

  //console.log(detail.platforms.map((p) => p.platform.name)); PLATAFORMAS
  //console.log(detail.genres.map((g) => g.name).join("-")); GENEROS

  return (
    <div>
      <Link to="/home">
        <button>Home</button>
      </Link>
      <h1>{detail.name}</h1>
      <img
        src={
          detail.background_image ||
          "https://myvideogamelist.com/assets/images/default.png"
        }
        alt="img not found"
        width="600px"
        height="340px"
      />
      <h2>Released date: {detail.released || detail.releaseDate}</h2>
      <h2>Platforms:</h2>
      <h5>
        {typeof detail.platforms === "string"
          ? detail.platforms.replace(/,\s*$/, " ")
          : detail.platforms?.map((p) => p.platform.name).join(", ")}
      </h5>
      <h2>Genres: </h2>
      <h5>{detail.genres?.map((g) => g.name).join("-")}</h5>
      <h5>Rating :{detail.rating}</h5>
      <h1>Description :</h1>

      <p> {detail.description_raw || detail.description}</p>
    </div>
  );
}
