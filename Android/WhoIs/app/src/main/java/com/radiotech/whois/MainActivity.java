package com.radiotech.whois;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.TextView;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.BufferedInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.net.URLConnection;
import java.util.Iterator;

public class MainActivity extends AppCompatActivity {
    ScreenNumber screenNumber;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        final MainActivity mainActivity = this;
        setContentView(R.layout.activity_main);
        screenNumber = new ScreenNumber();

        //((TextView)findViewById(R.id.ResponseText)).setText(ScreenNumber("2154537369"));

        final EditText searchNumberInput = findViewById(R.id.SearchNumberInput);
        final LinearLayout NumberDetails = findViewById(R.id.NumberDetails);

        final Button button = findViewById(R.id.SearchButton);
        button.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                NumberDetails.removeAllViews();
                final String number = searchNumberInput.getText().toString();
                JSONArray responseArray = screenNumber.screenNumber(number);
                for(int i=0; i<responseArray.length(); i++) {
                    TextView textView = new TextView(mainActivity);
                    try {
                        JSONObject entry =  responseArray.getJSONObject(i);
                        String output = "Number: " + entry.getString("phoneNumber") + "\n";
                        output += "Name: " + entry.getString("name") + "\n";
                        JSONObject address = entry.getJSONObject("address");
                        output+= "Address: " + address.getString("line1") + ", " +
                                address.getString("line2") + ", " +
                                address.getString("line3") + ", " +
                                address.getString("line4");

                        textView.setText(output);
                        NumberDetails.addView(textView);
                    }catch(Exception e) {
                        System.out.println(e.getMessage());
                    }
                }
            }
        });
    }



}
