import React, {useContext, useState, useEffect, useRef} from 'react';
import Realm from 'realm';
import NetInfo from '@react-native-community/netinfo';
import {ObjectId} from 'bson';
import {useAuth} from './AuthProvider';
import {Schema} from '../schemas/Schema';
import {SessionSchema} from '../schemas/SessionSchema';
import {FavouriteSchema} from '../schemas/FavouriteSchema';
import {DownloadSchema} from '../schemas/DownloadSchema';

const DataContext = React.createContext(null);

const DataProvider = ({children, projectId}) => {
  const {user, userId} = useAuth();

  console.log('USER ID', userId);

  const [sessions, setSessions] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const [zones, setZones] = useState([]);
  const [campaigns, setCampgaigns] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [tutorials, setTutorials] = useState([]);
  const [countries, setCountries] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [users, setUsers] = useState([]);
  const [files, setFiles] = useState([]);
  const [roles, setRoles] = useState([]);
  const [regions, setRegions] = useState([]);
  const [rewards, setRewards] = useState([]);
  const [cases, setCases] = useState([]);
  const [introductions, setIntroductions] = useState([]);
  const [resourceSlides, setResourceSlides] = useState([]);
  const [netInfo, setNetInfo] = useState(null);
  const [downloads, setDownloads] = useState([]);

  // This realm does not need to be a state variable, because we don't re-render
  // on changing the realm.
  const realmRef = useRef(null);

  useEffect(() => {
    NetInfo.fetch().then((state) => {
      const {isConnected} = state;
      console.log('IS CONNECTED', isConnected);
      if (user == null) {
        console.warn('Schema must be authenticated!');
        return;
      }

      const {
        zonesSchema,
        campaignSchema,
        faqSchema,
        tutorialSchema,
        countrySchema,
        userSchema,
        filesSchema,
        roleSchema,
        regionSchema,
        rewardSchema,
        caseStudySchema,
        introductionSchema,
        componentResourceSchema,
      } = Schema;
      const config = {
        schema: [
          SessionSchema.sessionSchema,
          FavouriteSchema.favouriteSchema,
          DownloadSchema.downloadSchema,
          zonesSchema,
          campaignSchema,
          faqSchema,
          tutorialSchema,
          countrySchema,
          userSchema,
          filesSchema,
          roleSchema,
          regionSchema,
          rewardSchema,
          caseStudySchema,
          introductionSchema,
          componentResourceSchema,
        ],
        sync: {
          user,
          partitionValue: projectId,
        },
      };
      // console.log(
      //   `Attempting to open Realm ${projectId} for user ${
      //     user.id
      //   } with config: ${JSON.stringify(config)}...`,
      // );

      let canceled = false;

      try {
        if (isConnected) {
          Realm.open(config)
            .then((openedRealm) => {
              console.log('HERE');
              if (canceled) {
                openedRealm.close();
                return;
              }
              realmRef.current = openedRealm;
              fetchData(openedRealm, isConnected);
              // Set the tasks state variable and re-render.
            })
            .catch((error) => console.warn('Failed to open realm:', error));
        } else {
          console.log('OFFLINE');
          const localRealm = new Realm(config);
          realmRef.current = localRealm;
          fetchData(localRealm, isConnected);
        }
      } catch (e) {
        console.log('ERROR', e);
      }

      return () => {
        canceled = true;
        const realm = realmRef.current;
        if (realm != null) {
          realm.removeAllListeners();
          realm.close();
          realmRef.current = null;
        }
      };
    });
    // Check that the user is logged in. You must authenticate to open a synced
    // realm.
  }, [user, projectId]); // Declare dependencies list in the second parameter to useEffect().

  const fetchData = (realm, isConnected) => {
    const syncCampaigns = realm.objects('campaign');
    const syncFaqs = realm.objects('faq');
    const syncTutorials = realm.objects('tutorial');
    const syncCountries = realm.objects('country');
    const syncFavourites = realm.objects('favourite');
    const syncUsers = realm.objects('users');
    const syncFiles = realm.objects('files');
    const syncRoles = realm.objects('roles');
    const syncRegions = realm.objects('regions');
    const syncRewards = realm.objects('reward');
    const syncIntroduction = realm.objects('introduction');
    const syncCaseStudies = realm.objects('case_study');
    const syncComponentResources = realm.objects('components_resource_slide');
    const syncZones = realm.objects('zone');
    const syncSessions = realm.objects('session');

    // Watch for changes to the tasks collection.
    realm.addListener('change', () => {
      // On change, update the tasks state variable and re-render.
      setSessions([...syncSessions]);
      setCampgaigns([...syncCampaigns]);
      setFaqs([...syncFaqs]);
      setTutorials([...syncTutorials]);
      setCountries([...syncCountries]);
      setFavourites([...syncFavourites]);
      setUsers([...syncUsers]);
      setFiles([...syncFiles]);
      setRoles([...syncRoles]);
      setRegions([...syncRegions]);
      setRewards([...syncRewards]);
      setCases([...syncCaseStudies]);
      setIntroductions([...syncIntroduction]);
      setZones([...syncZones]);
      setResourceSlides([...syncComponentResources]);
    });

    // Set the tasks state variable and re-render.
    setSessions([...syncSessions]);
    setCampgaigns([...syncCampaigns]);
    setFaqs([...syncFaqs]);
    setTutorials([...syncTutorials]);
    setCountries([...syncCountries]);
    setFavourites([...syncFavourites]);
    setUsers([...syncUsers]);
    setFiles([...syncFiles]);
    setRoles([...syncRoles]);
    setRegions([...syncRegions]);
    setRewards([...syncRewards]);
    setCases([...syncCaseStudies]);
    setIntroductions([...syncIntroduction]);
    setZones([...syncZones]);
    setResourceSlides([...syncComponentResources]);

    setNetInfo(isConnected);
  };

  const createSession = (newSessionName) => {
    const password =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    const newSessionId = new ObjectId();
    setSessionId(newSessionId);
    try {
      const realm = realmRef.current;
      realm.write(() => {
        realm.create(
          'session',
          new SessionSchema({
            title: newSessionName,
            user: new ObjectId(userId),
            sessionId: newSessionId,
            partition: projectId,
            password,
          }),
        );
      });
    } catch (e) {
      console.log(e);
    }
  };

  const createFavourites = (newFavouriteName, campaignId) => {
    console.log('FAVOURITES NETINFO', netInfo);
    const realm = realmRef.current;
    realm.write(() => {
      realm.create(
        'favourite',
        new FavouriteSchema({
          title: newFavouriteName,
          campaign: campaignId,
          session: sessionId,
          partition: projectId,
        }),
      );
    });
  };

  const createDownloads = (
    downloadId,
    campaignsArray,
    email,
    session,
    password,
  ) => {
    const realm = realmRef.current;
    realm.write(() => {
      realm.create(
        'download',
        new DownloadSchema({
          downloadId,
          campaigns: campaignsArray,
          email,
          session,
          password,
          partition: projectId,
        }),
      );
    });
  };

  const endSession = () => {
    setSessionId(null);
  };

  return (
    <DataContext.Provider
      value={{
        sessions,
        zones,
        campaigns,
        faqs,
        countries,
        favourites,
        tutorials,
        users,
        files,
        regions,
        roles,
        rewards,
        projectId,
        sessionId,
        cases,
        introductions,
        resourceSlides,
        netInfo,
        createSession,
        createFavourites,
        endSession,
        createDownloads,
      }}>
      {children}
    </DataContext.Provider>
  );
};

const useDatas = () => {
  const value = useContext(DataContext);
  if (value == null) {
    throw new Error('useTasks() called outside of a TasksProvider?');
  }
  return value;
};

export {DataProvider, useDatas};
