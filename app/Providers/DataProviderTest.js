import React, {useContext, useState, useEffect, useRef} from 'react';
import Realm from 'realm';
import {ObjectId} from 'bson';
import {useAuth} from './AuthProvider';
import {Schema} from '../schemas/Schema';
import {SessionSchema} from '../schemas/SessionSchema';
import {FavouriteSchema} from '../schemas/FavouriteSchema';
import {DownloadSchema} from '../schemas/DownloadSchema';
// Create the context that will be provided to descendants of TasksProvider via
// the useTasks hook.
const DataContext = React.createContext(null);

const DataProvider = ({children, projectId}) => {
  // Get the user from the AuthProvider context.
  const {user, userId} = useAuth();

  console.log('USER ID', userId);

  // The tasks list will contain the tasks in the realm when opened.
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
  const [downloads, setDownloads] = useState([]);

  // This realm does not need to be a state variable, because we don't re-render
  // on changing the realm.
  const realmRef = useRef(null);

  // The effect hook replaces lifecycle methods such as componentDidMount. In
  // this effect hook, we open the realm that contains the tasks and fetch a
  // collection of tasks.
  useEffect(() => {
    // Check that the user is logged in. You must authenticate to open a synced
    // realm.
    if (user == null) {
      console.warn('Schema must be authenticated!');
      return;
    }

    // Define the configuration for the realm to use the Task schema. Base the
    // sync configuration on the user settings and use the project ID as the
    // partition value. This will open a realm that contains all objects where
    // object._partition == projectId.
    console.log('PROJECT ID', projectId);
    const {
      // sessionSchema,
      // favouriteSchema,
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
      // path: Realm.defaultPath,
      // path: `file://${dirs}/realm`,
    };

    console.log(
      `Attempting to open Realm ${projectId} for user ${
        user.id
      } with config: ${JSON.stringify(config)}...`,
    );

    // Set this flag to true if the cleanup handler runs before the realm open
    // success handler, e.g. because the component unmounted.
    let canceled = false;

    // try {
    //   const localRealm = new Realm(config);
    //   const syncCampaigns = localRealm.objects('campaign');
    //   const syncFaqs = localRealm.objects('faq');
    //   const syncTutorials = localRealm.objects('tutorial');
    //   const syncCountries = localRealm.objects('country');
    //   const syncFavourites = localRealm.objects('favourite');
    //   const syncUsers = localRealm.objects('users');
    //   const syncFiles = localRealm.objects('files');
    //   const syncRoles = localRealm.objects('roles');
    //   const syncRegions = localRealm.objects('regions');
    //   const syncRewards = localRealm.objects('reward');
    //   const syncIntroduction = localRealm.objects('introduction');
    //   const syncCaseStudies = localRealm.objects('case_study');
    //   const syncComponentResources = localRealm.objects(
    //     'components_resource_slide',
    //   );
    //   const syncZones = localRealm.objects('zone');
    //   console.log('SYNC ZONE', syncZones);
    //   const syncSessions = localRealm.objects('session');

    //   // Watch for changes to the tasks collection.
    //   localRealm.addListener('change', () => {
    //     // On change, update the tasks state variable and re-render.
    //     setSessions([...syncSessions]);
    //     setCampgaigns([...syncCampaigns]);
    //     setFaqs([...syncFaqs]);
    //     setTutorials([...syncTutorials]);
    //     setCountries([...syncCountries]);
    //     setFavourites([...syncFavourites]);
    //     setUsers([...syncUsers]);
    //     setFiles([...syncFiles]);
    //     setRoles([...syncRoles]);
    //     setRegions([...syncRegions]);
    //     setRewards([...syncRewards]);
    //     setCases([...syncCaseStudies]);
    //     setIntroductions([...syncIntroduction]);
    //     setZones([...syncZones]);
    //     setResourceSlides([...syncComponentResources]);
    //   });

    //   // Set the tasks state variable and re-render.
    //   setSessions([...syncSessions]);
    //   setCampgaigns([...syncCampaigns]);
    //   setFaqs([...syncFaqs]);
    //   setTutorials([...syncTutorials]);
    //   setCountries([...syncCountries]);
    //   setFavourites([...syncFavourites]);
    //   setUsers([...syncUsers]);
    //   setFiles([...syncFiles]);
    //   setRoles([...syncRoles]);
    //   setRegions([...syncRegions]);
    //   setRewards([...syncRewards]);
    //   setCases([...syncCaseStudies]);
    //   setIntroductions([...syncIntroduction]);
    //   setZones([...syncZones]);
    //   setResourceSlides([...syncComponentResources]);
    // } catch (e) {
    //   console.log('ERROR', e);
    // }

    try {
      Realm.open(config)
        .then((openedRealm) => {
          console.log('HERE');
          if (canceled) {
            openedRealm.close();
            return;
          }
          realmRef.current = openedRealm;
          const syncCampaigns = openedRealm.objects('campaign');
          const syncFaqs = openedRealm.objects('faq');
          const syncTutorials = openedRealm.objects('tutorial');
          console.log(syncTutorials);

          const syncCountries = openedRealm.objects('country');
          const syncFavourites = openedRealm.objects('favourite');
          const syncUsers = openedRealm.objects('users');
          const syncFiles = openedRealm.objects('files');
          const syncRoles = openedRealm.objects('roles');
          const syncRegions = openedRealm.objects('regions');
          const syncRewards = openedRealm.objects('reward');
          const syncIntroduction = openedRealm.objects('introduction');
          const syncCaseStudies = openedRealm.objects('case_study');
          const syncComponentResources = openedRealm.objects(
            'components_resource_slide',
          );
          const syncZones = openedRealm.objects('zone');
          const syncSessions = openedRealm.objects('session');
          const syncDownloads = openedRealm.objects('download');
          openedRealm.addListener('change', () => {
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
        })
        .catch((error) => console.warn('Failed to open realm:', error));
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
  }, [user, projectId]); // Declare dependencies list in the second parameter to useEffect().

  const createSession = async (newSessionName) => {
    const newSessionId = new ObjectId();
    console.log('USER ID CREATE', userId);
    setSessionId(newSessionId);
    try {
      const realm = realmRef.current;
      // const realm = await Realm.open({
      //   schema: [Schema.sessionSchema],
      //   sync: {
      //     user,
      //     partitionValue: projectId,
      //   },
      // });
      realm.write(() => {
        realm.create(
          'session',
          new SessionSchema({
            title: newSessionName,
            user: new ObjectId(userId),
            sessionId: newSessionId,
            partition: projectId,
          }),
        );
      });
    } catch (e) {
      console.log(e);
    }
  };

  const createFavourites = (newFavouriteName, campaignId) => {
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

  // Render the children within the TaskContext's provider. The value contains
  // everything that should be made available to descendants that use the
  // useTasks hook.
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
        createSession,
        createFavourites,
        endSession,
        createDownloads,
      }}>
      {children}
    </DataContext.Provider>
  );
};

// The useTasks hook can be used by any descendant of the TasksProvider. It
// provides the tasks of the TasksProvider's project and various functions to
// create, update, and delete the tasks in that project.
const useDatas = () => {
  const value = useContext(DataContext);
  if (value == null) {
    throw new Error('useTasks() called outside of a TasksProvider?');
  }
  return value;
};

export {DataProvider, useDatas};
