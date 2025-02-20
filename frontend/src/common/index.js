const domain = "http://localhost:8000";
// http://localhost:5173/signup
const Api = {
  signUp: {
    url: `${domain}/user/signup`,
    method: "post",
  },
  login: {
    url: `${domain}/user/login`,
    method: "post",
  },
  current_user: {
    url: `${domain}/user/user-detail`,
    method: "get",
  },
  logout_user: {
    url: `${domain}/user/logout-user`,
    method: "post",
  },
  postDestination: {
    url: `${domain}/destination/postDestination`,
    method: "post",
  },
  getAllDestinations: {
    url: `${domain}/destination/getAllDestinations`,
    method: "get",
  },
  getOneDestination: {
    url: `${domain}/destination/getOneDestination`,
    method: "get",
  },
  searchDestination: {
    url: `${domain}/destination/searchDestination`,
    method: "get",
  },
  filterDestinations: {
    url: `${domain}/destination/filterDestinations`,
    method: "get",
  },
  postReview: {
    url: `${domain}/reviews/postReview`,
    method: "post",
  },
  getAllReviews: {
    url: `${domain}/reviews/getAllReviews`,
    method: "get",
  },
  getReview: {
    url: `${domain}/reviews/getReview`,
    method: "get",
  },
};
export default Api;
