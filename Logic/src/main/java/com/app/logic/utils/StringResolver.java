package com.app.logic.utils;

public class StringResolver {

    public static boolean checkIfTyped(String string) {
        return (string != null && !string.isEmpty());
    }

    public static String parseIfNull(String string) {
        return string == null ? "" : string;
    }
}
