export function getDateRangeDescription(lang, start, end, wholeDay = true) {
  const startTime = new Intl.DateTimeFormat(lang, {
    hour: 'numeric',
    minute: 'numeric',
  }).format(start);

  const endTime = new Intl.DateTimeFormat(lang, {
    hour: 'numeric',
    minute: 'numeric',
  }).format(end);

  const time =
    wholeDay || startTime === endTime ? '' : `, ${startTime} - ${endTime}`;

  if (
    !end ||
    (start.getMonth() === end.getMonth() &&
      start.getFullYear() === end.getFullYear() &&
      start.getDate() === end.getDate())
  ) {
    return (
      new Intl.DateTimeFormat(lang, {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }).format(start) + time
    );
  }

  if (
    start.getMonth() === end.getMonth() &&
    start.getFullYear() === end.getFullYear()
  ) {
    return `${new Intl.DateTimeFormat(lang, {
      day: 'numeric',
    }).format(start)} ${lang === 'nl' ? 't/m' : 'to'} ${new Intl.DateTimeFormat(
      lang,
      {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      },
    ).format(end)}`;
  }

  return `${new Intl.DateTimeFormat(lang, {
    day: 'numeric',
    month: 'short',
  }).format(start)} ${lang === 'nl' ? 't/m' : 'to'} ${new Intl.DateTimeFormat(
    lang,
    {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    },
  ).format(end)}`;
}
