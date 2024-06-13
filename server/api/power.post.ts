import {$fetch} from "ofetch";
import dayjs from "dayjs";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    let startDate = dayjs(new Date(body.startDate)).format('YYYY-MM-DD')
    let endDate = dayjs(new Date(body.startDate)).add(30, 'day').format('YYYY-MM-DD')

    if (body.startDate) {
        startDate = body.startDate
    }
    if (body.endDate) {
        endDate = body.endDate
    }
    return await $fetch(`https://cskh-api.cpc.vn/api/remote/outages/area?orgCode=PC10&subOrgCode=PC10MM&fromDate=${startDate}%2000%3A00%3A00&toDate=${endDate}%2023%3A59%3A59&page=1&limit=10&stationCode=MC539546&status=Approved`)
})
