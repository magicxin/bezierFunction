let utils = {}
utils.dateFormat = function(time) {
  let date = new Date(time)
  return date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate()
}
export default utils
