module.exports = function convertHoursToSeconds(time) {
  const [hour, minutes] = time.split(':').map(Number);
  return (hour*3600) + (minutes*60);
}

