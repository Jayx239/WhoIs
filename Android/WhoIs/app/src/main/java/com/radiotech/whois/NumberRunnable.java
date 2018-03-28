package com.radiotech.whois;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.net.URLConnection;

/**
 * Created by JayMoney on 3/25/18.
 */

public class NumberRunnable implements Runnable {

    public NumberRunnable(){
        phoneNumber = "";
    }
    public NumberRunnable(String number) {
        phoneNumber = number;
    }

    private String phoneNumber;
    private String responseText;

    public String getResponseText() {
        return responseText;
    }

    public JSONArray getResponse() throws JSONException {
        JSONArray jsonArray = new JSONArray(responseText);
        return jsonArray;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    @Override
    public void run() {

        try {
            URL url = new URL(BuildConfig.SERVER_URL + "/ScreenNumber?phoneNumber=" + phoneNumber);
            URLConnection urlConnection =  url.openConnection();
            BufferedInputStream stream = new BufferedInputStream(urlConnection.getInputStream());

            final String innertext = readResponse(stream);
            responseText = innertext;
        } catch(IOException io) {
            System.out.println(io.getMessage());
        } catch(Exception e) {
            System.out.println(e.getMessage());
        }
        finally {

        }
    }

    private String readResponse(InputStream inputStream) throws IOException {

        StringBuilder sb = new StringBuilder();
        int nextChar = inputStream.read();

        while(nextChar > 0) {
            sb.append((char) nextChar);
            nextChar = inputStream.read();
        }

        return sb.toString();
    }
}