package com.example.cpen321_m5;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Spinner;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;
import com.google.android.material.bottomnavigation.BottomNavigationView;
import com.google.android.material.textfield.TextInputLayout;

import org.json.JSONException;
import org.json.JSONObject;

public class Post extends AppCompatActivity {

//    private BottomNavigationView bottomNavigationView;

    Button submit;
    EditText priceedit;
    String pricestring;                             //price that use enter in

    Spinner loc_spi;
    String locationstring;                          //location that use enter in
    Spinner typ_spi;
    String typesstring;                             //types that use enter in

    TextInputLayout phone_til;                      //phone num that user enter in
    String phonestring;

    TextInputLayout email_til;                      //email that user enter in
    String emailstring;

    TextInputLayout description_til;                //description that user enter in
    String descriptionstring;



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_post);

        // initialize And Assign Variable
        BottomNavigationView bottomNavigationView = findViewById(R.id.bottomNavigationView);

        // set Home Selected
        bottomNavigationView.setSelectedItemId(R.id.nav_post);

        // perform ItemSelectedListener
        bottomNavigationView.setOnNavigationItemSelectedListener(new BottomNavigationView.OnNavigationItemSelectedListener(){

            @Override
            public boolean onNavigationItemSelected(@NonNull MenuItem item) {
                switch(item.getItemId()) {
                    case R.id.nav_home:
                        startActivity(new Intent(getApplicationContext(), MainActivity.class));
                        overridePendingTransition(0,0);
                        return true;
                    case R.id.nav_chat:
                        startActivity(new Intent(getApplicationContext(), Chat.class));
                        overridePendingTransition(0,0);
                        return true;
                    case R.id.nav_post:
                        return true;
                }
                return false;
            }
        });
        //......................................................................................

        submit = (Button) findViewById(R.id.submit);
        submit.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                // TODO Auto-generated method stub
                // Intent returnBtn = new Intent("Mainactivity");
                // startActivity(returnBtn);
                priceedit   = (EditText)findViewById(R.id.editprice);
                pricestring = priceedit.getText().toString();
                Log.v("post/price:", pricestring);

                loc_spi = (Spinner)findViewById(R.id.location_spi);
                locationstring = loc_spi.getSelectedItem().toString();
                Log.v("post/location:", locationstring);

                typ_spi = (Spinner)findViewById(R.id.types_spi);
                typesstring = typ_spi.getSelectedItem().toString();
                Log.v("post/types:", typesstring);

                phone_til = (TextInputLayout)findViewById(R.id.editphone);
                phonestring = phone_til.getEditText().getText().toString();
                Log.v("post/phone number:", phonestring);

                email_til = (TextInputLayout)findViewById(R.id.editemail);
                emailstring = email_til.getEditText().getText().toString();
                Log.v("post/email:", emailstring);

                description_til = (TextInputLayout)findViewById(R.id.editdescrip);
                descriptionstring = description_til.getEditText().getText().toString();
                Log.v("post/descript number:", descriptionstring);






                String postUrl = "http:20.185.220.227:3000";

                RequestQueue requestQueue = Volley.newRequestQueue(Post.this);

                JSONObject postData = new JSONObject();
                try {
                    postData.put("price", Integer.valueOf(pricestring));
                    postData.put("location", locationstring);
                    postData.put("types", typesstring);
                    postData.put("phone", phonestring);
                    postData.put("email", emailstring);
                    postData.put("descript", descriptionstring);
                } catch (JSONException e) {
                    e.printStackTrace();
                }


                JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(Request.Method.POST, postUrl, postData, new Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject response) {
                        System.out.println(response);

                    }
                }, new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        error.printStackTrace();
                    }
                });

                requestQueue.add(jsonObjectRequest);




                finish();

            }
        });





    }
}