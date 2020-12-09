package com.app.logic.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;

public class DateResolver {

    private static final SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");

    public static String formatToString(Date date) {
        if (date == null) return "";
        else return format.format(date);
    }

    public static Date parseFromString(String date) throws ParseException {
        if (date == null) return null;
        return format.parse(date);
    }

    public static Date convertLocalDateToDate(LocalDate localDate) {
        if (localDate == null) return null;
        return Date.from(localDate.atStartOfDay()
                .atZone(ZoneId.systemDefault())
                .toInstant());
    }

    public static LocalDate convertDateToLocalDate(Date date) {
        if (date == null) return null;
        return date.toInstant()
                .atZone(ZoneId.systemDefault())
                .toLocalDate();
    }
}
