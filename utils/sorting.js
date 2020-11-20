module.exports.sorting = (data, sortBy, orderBy) => {
  return data.sort((a, b) => {
    if (sortBy === 'date') {
      return orderBy == 'DESC'
        ? new Date(b[sortBy]) - new Date(a[sortBy])
        : new Date(a[sortBy]) - new Date(b[sortBy]);
    } else {
      return orderBy == 'DESC' ? b[sortBy] - a[sortBy] : a[sortBy] - b[sortBy];
    }
  });
};
