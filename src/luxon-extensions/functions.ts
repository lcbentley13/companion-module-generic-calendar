import { DateTime } from 'luxon'
import { ModuleInstance } from '../main.js'

export function GetRezonedDateTime(self: ModuleInstance): DateTime {
	const now = DateTime.now()
	switch (self.config.zone) {
		case 'utc':
			return now.setZone('UTC')
		case 'fixedOffset':
			return now.setZone(self.config.fixedOffset)
		case 'iana':
			return now.setZone(self.config.iana)
		default:
			return now
	}
}

export function GetWeekOccurrence(dt: DateTime): number {
	return Math.ceil(dt.day / 7)
}

export function GetNumberOfWeeksInMonth(dt: DateTime): number {
	const endOfMonth = dt.endOf('month')
	const targetDay = dt.weekday

	let count = 0
	let currentDay = dt.startOf('month')

	while (currentDay <= endOfMonth) {
		if (currentDay.weekday === targetDay) {
			count++
		}
		currentDay = currentDay.plus({ days: 1 })
	}

	return count
}
