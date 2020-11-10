export const sorter = (a, b) => {
  if (a.createdAt > b.createdAt) return 1;
  if (a.createdAt == b.createdAt) return 0;
  if (a.createdAt < b.createdAt) return -1;
};

export const dateFormatter = (createdAt) => {
  let date = new Date(createdAt);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let dt = date.getDate();
  let hours = date.getHours();
  let mins = date.getMinutes();

  if (mins < 10) {
    mins = "0" + mins;
  }

  if (hours < 10) {
    hours = "0" + hours;
  }

  if (dt < 10) {
    dt = "0" + dt;
  }
  if (month < 10) {
    month = "0" + month;
  }
  let result = year + "-" + month + "-" + dt + " " + hours + ":" + mins;
  return result;
};

export const randomPostId = () => {
  return Math.floor(Math.random() * 24 + 1);
};
