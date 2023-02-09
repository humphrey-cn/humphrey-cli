import dayjs from 'dayjs'

// 格式化时间 formatDate(date, format)
// @params { date } date 时间
// @params { String } format 时间格式

export function formatDate(date, format = 'YYYY-MM-DD') {
    return dayjs(date).format(format)
}