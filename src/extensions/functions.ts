import { DateTime } from 'luxon'
import { ModuleInstance } from '../main.js'

export function GetRezonedDateTime(self: ModuleInstance, dt: DateTime): DateTime {
	switch (self.config.zone) {
		case 'utc':
			return dt.setZone('UTC')
		case 'fixedOffset':
			return dt.setZone(self.config.fixedOffset)
		case 'iana':
			return dt.setZone(self.config.iana)
		default:
			return dt
	}
}

export function GetWeekOccurrence(dt: DateTime): number {
	return Math.ceil(dt.day / 7)
}

export function GetNumberOfWeeksInMonth(dt: DateTime): number {
	const startOfMonth = dt.startOf('month')
	const endOfMonth = dt.endOf('month')
	const targetDay = dt.weekday

	const firstOccurrence = startOfMonth.plus({ days: (targetDay - startOfMonth.weekday + 7) % 7 })

	return Math.floor(endOfMonth.diff(firstOccurrence, 'weeks').weeks) + 1
}
