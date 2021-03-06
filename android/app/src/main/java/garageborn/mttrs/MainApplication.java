package garageborn.mttrs;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.github.yamill.orientation.OrientationPackage;
import com.sbugert.rnadmob.RNAdMobPackage;
import com.cboy.rn.splashscreen.SplashScreenReactPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import io.sentry.RNSentryPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import cl.json.RNSharePackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.crashlytics.android.Crashlytics;
import com.idehub.GoogleAnalyticsBridge.GoogleAnalyticsBridgePackage;
import com.smixx.fabric.FabricPackage;
import io.fabric.sdk.android.Fabric;
import com.geektime.rnonesignalandroid.ReactNativeOneSignalPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {
  @Override
  public void onCreate() {
    super.onCreate();
    Fabric.with(this, new Crashlytics());
    SoLoader.init(this, /* native exopackage */ false);
  }

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new OrientationPackage(),
          new SplashScreenReactPackage(),
          new RNSentryPackage(MainApplication.this),
          new FabricPackage(),
          new RNDeviceInfo(),
          new ReactNativeOneSignalPackage(),
          new GoogleAnalyticsBridgePackage(),
          new RNSharePackage(),
          new LinearGradientPackage(),
          new RNAdMobPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }
}
