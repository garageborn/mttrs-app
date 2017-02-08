package garageborn.mttrs;

import android.graphics.Color;
import android.os.Bundle;

import com.facebook.react.ReactInstanceManager;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.ReactActivity;
import com.BV.LinearGradient.LinearGradientPackage;

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

        // After RN start, set our background
        getReactNativeHost().getReactInstanceManager().addReactInstanceEventListener(new ReactInstanceManager.ReactInstanceEventListener() {
            @Override
            public void onReactContextInitialized(ReactContext context) {
                // Hide Splash Screen
                getWindow().getDecorView().setBackgroundColor(Color.TRANSPARENT);
            }
        });

        super.onCreate(savedInstanceState);
    }
}
