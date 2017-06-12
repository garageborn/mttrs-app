package garageborn.mttrs;

import android.graphics.Color;
import android.os.Bundle;
import android.content.Intent;

import com.facebook.react.ReactInstanceManager;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.ReactActivity;
import com.BV.LinearGradient.LinearGradientPackage;
import com.cboy.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {
    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "mttrs";
    }

   @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);
        super.onCreate(savedInstanceState);
    }
}
