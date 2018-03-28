package com.radiotech.whois;

import org.json.JSONArray;
import org.json.JSONObject;

/**
 * Created by JayMoney on 3/25/18.
 */

public class ScreenNumber {

    public ScreenNumber() {

    }

    public JSONArray screenNumber(final String phoneNumber) {

        NumberRunnable runnable = new NumberRunnable();
        runnable.setPhoneNumber(phoneNumber);
        Thread apiThread = new Thread(runnable);
        JSONArray responseObject = null;
        apiThread.start();
        try {
            apiThread.join();
            responseObject = runnable.getResponse();

        }catch (Exception ex){
            System.out.println(ex.getMessage());
            responseObject = new JSONArray();
        }
        finally {
            return responseObject;
        }
    }

}

