import {
  AppItemFactory,
  DocumentItemFactory,
  FileItemFactory,
  FolderItemFactory,
  ItemType,
  LinkItemFactory,
  PackedFolderItemFactory,
  PermissionLevel,
  buildDocumentExtra,
  buildFileExtra,
  buildLinkExtra,
} from '@graasp/sdk';

import { v4 } from 'uuid';

import { ItemForTest } from '../../support/types';
import { MOCK_IMAGE_URL } from '../fileLinks';
import { CURRENT_MEMBER } from '../members';

export const STATIC_ELECTRICITY: {
  items: ItemForTest[];
} = {
  items: [
    PackedFolderItemFactory(
      {
        id: 'fdf09f5a-5688-11eb-ae31-0242ac130003',
        path: 'fdf09f5a_5688_11eb_ae31_0242ac130003',
        name: 'Static Electricity',
        description: '',
        creator: CURRENT_MEMBER,
        extra: {
          [ItemType.FOLDER]: {},
        },
      },
      { permission: PermissionLevel.Admin },
    ),
    FolderItemFactory({
      id: 'gcafbd2a-5688-11eb-ae92-0242ac130015',
      path: 'fdf09f5a_5688_11eb_ae31_0242ac130003.gcafbd2a_5688_11eb_ae92_0242ac130015',
      name: 'Causes and experiences',
      creator: CURRENT_MEMBER,
      extra: {
        [ItemType.FOLDER]: {},
      },
    }),
    DocumentItemFactory({
      id: 'gcefbd2a-5688-11eb-ae92-0542bc120002',
      path: 'fdf09f5a_5688_11eb_ae31_0242ac130003.gcafbd2a_5688_11eb_ae92_0242ac130015.gcefbd2a_5688_11eb_ae92_0542bc120002',
      name: 'cat',
      creator: CURRENT_MEMBER,
      extra: buildDocumentExtra({
        content:
          '<p><strong>Contact-induced charge separation</strong></p><p>Electrons can be exchanged between materials on contact; materials with weakly bound electrons tend to lose them while materials with sparsely filled outer shells tend to gain them. This is known as the triboelectric effect and results in one material becoming positively charged and the other negatively charged. The polarity and strength of the charge on a material once they are separated depends on their relative positions in the triboelectric series. The triboelectric effect is the main cause of static electricity as observed in everyday life, and in common high-school science demonstrations involving rubbing different materials together (e.g., fur against an acrylic rod). Contact-induced charge separation causes your hair to stand up and causes "static cling" (for example, a balloon rubbed against the hair becomes negatively charged; when near a wall, the charged balloon is attracted to positively charged particles in the wall, and can "cling" to it, appearing to be suspended against gravity).</p>',
      }),
    }),
    DocumentItemFactory({
      id: 'gcefbd2a-5688-11eb-fe32-0542bc120002',
      path: 'fdf09f5a_5688_11eb_ae31_0242ac130003.gcafbd2a_5688_11eb_ae92_0242ac130015.gcefbd2a_5688_11eb_fe32_0542bc120002',
      name: 'causes text',
      description: '',
      creator: CURRENT_MEMBER,
      extra: buildDocumentExtra({
        content:
          '<p><strong>Causes</strong></p><p>Materials are made of atoms that are normally electrically neutral because they contain equal numbers of positive charges (protons in their nuclei) and negative charges (electrons in "shells" surrounding the nucleus). The phenomenon of static electricity requires a separation of positive and negative charges. When two materials are in contact, electrons may move from one material to the other, which leaves an excess of positive charge on one material, and an equal negative charge on the other. When the materials are separated they retain this charge imbalance.</p>',
      }),
    }),
    LinkItemFactory({
      id: 'gcefbd2a-5648-31eb-fe32-0542bc120002',
      path: 'fdf09f5a_5688_11eb_ae31_0242ac130003.gcafbd2a_5688_11eb_ae92_0242ac130015.gcefbd2a_5648_31eb_fe32_0542bc120002',
      name: 'causes link',
      creator: CURRENT_MEMBER,
      extra: buildLinkExtra({
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Cat_demonstrating_static_cling_with_styrofoam_peanuts.jpg/310px-Cat_demonstrating_static_cling_with_styrofoam_peanuts.jpg',
        html: '<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Cat_demonstrating_static_cling_with_styrofoam_peanuts.jpg/310px-Cat_demonstrating_static_cling_with_styrofoam_peanuts.jpg">',
        thumbnails: [],
        icons: [],
      }),
      settings: { showLinkIframe: true },
    }),
    DocumentItemFactory({
      id: 'gcefbd4e-5688-11eb-fe32-0542bc120002',
      path: 'fdf09f5a_5688_11eb_ae31_0242ac130003.gcafbd2a_5688_11eb_ae92_0242ac130015.gcefbd4e_5688_11eb_fe32_0542bc120002',
      name: 'pressure text',
      creator: CURRENT_MEMBER,
      extra: buildDocumentExtra({
        content:
          '<p><strong>Pressure-induced charge separation</strong></p><p>Applied mechanical stress generates a separation of charge in certain types of crystals and ceramics molecules.</p><p>Heat-induced charge separation</p><p>Main article: Pyroelectric effect</p><p>Heating generates a separation of charge in the atoms or molecules of certain materials. All pyroelectric materials are also piezoelectric. The atomic or molecular properties of heat and pressure response are closely related.</p><p><br></p><p><br></p><p><strong>Charge-induced charge separation</strong></p><p>A charged object brought close to an electrically neutral object causes a separation of charge within the neutral object. Charges of the same polarity are repelled and charges of the opposite polarity are attracted. As the force due to the interaction of electric charges falls off rapidly with increasing distance, the effect of the closer (opposite polarity) charges is greater and the two objects feel a force of attraction. The effect is most pronounced when the neutral object is an electrical conductor as the charges are more free to move around. Careful grounding of part of an object with a charge-induced charge separation can permanently add or remove electrons, leaving the object with a global, permanent charge. This process is integral to the workings of the Van de Graaff generator, a device commonly used to demonstrate the effects of static electricity.</p>',
      }),
      settings: {},
    }),
    LinkItemFactory({
      id: 'gceffe4e-5688-11eb-fe32-0542bc120002',
      path: 'fdf09f5a_5688_11eb_ae31_0242ac130003.gcafbd2a_5688_11eb_ae92_0242ac130015.gceffe4e_5688_11eb_fe32_0542bc120002',
      name: 'causes video link',
      creator: CURRENT_MEMBER,
      extra: buildLinkExtra({
        url: 'https://www.dailymotion.com/embed/video/xgh289?autoplay=1',
        thumbnails: [],
        html: '<div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 57.5%;"><iframe src="https://geo.dailymotion.com/player.html?video=xgh289&amp;&amp;" style="border: 0; top: 0; left: 0; width: 100%; height: 100%; position: absolute;" allowfullscreen scrolling="no" allow="encrypted-media"></iframe></div>',
        icons: [],
      }),
      settings: { showLinkIframe: true },
    }),
    FolderItemFactory({
      id: 'gcafbd2a-4218-31eb-fe32-0542bc120002',
      path: 'fdf09f5a_5688_11eb_ae31_0242ac130003.gcafbd2a_4218_31eb_fe32_0542bc120002',
      name: 'Introduction',
      description: '',
      creator: CURRENT_MEMBER,
      extra: {
        [ItemType.FOLDER]: {},
      },
    }),
    AppItemFactory({
      id: 'gcafbd2a-4118-31eb-fe32-0542bc120002',
      path: 'fdf09f5a_5688_11eb_ae31_0242ac130003.gcafbd2a_4218_31eb_fe32_0542bc120002.gcafbd2a_4118_31eb_fe32_0542bc120002',
      name: 'Balloons and Static Electricity Source',
      description:
        '<p>Grab a balloon to explore concepts of static electricity such as charge transfer, attraction, repulsion, and induced charge.</p>',
      creator: CURRENT_MEMBER,
      extra: {
        [ItemType.APP]: {
          url: 'https://gateway.golabz.eu/os/pub/phet/http%25253A%25252F%25252Fphet.colorado.edu%25252Fen%25252Fsimulation%25252Fballoons-and-static-electricity/w_default.html',
        },
      },
    }),
    DocumentItemFactory({
      id: 'gcafbd2a-4118-31eb-fe32-1542bc120002',
      path: 'fdf09f5a_5688_11eb_ae31_0242ac130003.gcafbd2a_4218_31eb_fe32_0542bc120002.gcafbd2a_4118_31eb_fe32_1542bc120002',
      name: 'some text',
      description: '',
      creator: CURRENT_MEMBER,
      extra: buildDocumentExtra({
        content:
          '<p><strong>Static electricity</strong></p><p>Static electricity is an imbalance of electric charges within or on the surface of a material. The charge remains until it is able to move away by means of an electric current or electrical discharge. Static electricity is named in contrast with current electricity, which flows through wires or other conductors and transmits energy.</p><p>A static electric charge can be created whenever two surfaces contact and separate, and at least one of the surfaces has a high resistance to electric current (and is therefore an electrical insulator). The effects of static electricity are familiar to most people because people can feel, hear, and even see the spark as the excess charge is neutralized when brought close to a large electrical conductor (for example, a path to ground), or a region with an excess charge of the opposite polarity (positive or negative). The familiar phenomenon of a static shock – more specifically, an electrostatic discharge – is caused by the neutralization of charge.</p>',
      }),
    }),
    FolderItemFactory({
      id: 'gcbffd2a-4218-31eb-fe32-0542bc120002',
      path: 'fdf09f5a_5688_11eb_ae31_0242ac130003.gcbffd2a_4218_31eb_fe32_0542bc120002',
      name: 'Removal and Prevention',
      description: '',
      creator: CURRENT_MEMBER,
      extra: {
        [ItemType.FOLDER]: {},
      },
    }),
    DocumentItemFactory({
      id: 'gcbffd2a-4218-31eb-fe32-0542bc121102',
      path: 'fdf09f5a_5688_11eb_ae31_0242ac130003.gcbffd2a_4218_31eb_fe32_0542bc120002.gcbffd2a_4218_31eb_fe32_0542bc121102',
      name: 'text',
      creator: CURRENT_MEMBER,
      extra: buildDocumentExtra({
        content:
          '<p><strong>Removing and Prevention</strong></p><p>Removing or preventing a buildup of static charge can be as simple as opening a window or using a humidifier to increase the moisture content of the air, making the atmosphere more conductive. <a href="https://en.wikipedia.org/wiki/Static_electricity#cite_note-2" rel="noopener noreferrer" target="_blank">Air ionizers can perform the same task</a>.</p><p>Items that are particularly sensitive to static discharge may be treated with the application of an antistatic agent, which adds a conducting surface layer that ensures any excess charge is evenly distributed. Fabric softeners and dryer sheets used in washing machines and clothes dryers are an example of an antistatic agent used to prevent and remove static cling.</p><p>Many semiconductor devices used in electronics are particularly sensitive to static discharge. Conductive antistatic bags are commonly used to protect such components. People who work on circuits that contain these devices often ground themselves with a conductive antistatic strap.</p><p><br></p><p>In the industrial settings such as paint or flour plants as well as in hospitals, antistatic safety boots are sometimes used to prevent a buildup of static charge due to contact with the floor. These shoes have soles with good conductivity. Anti-static shoes should not be confused with insulating shoes, which provide exactly the opposite benefit – some protection against serious electric shocks from the mains voltage.</p>',
      }),
    }),
    LinkItemFactory({
      id: 'gcbffd2a-4218-31eb-fe32-0542bc121145',
      path: 'fdf09f5a_5688_11eb_ae31_0242ac130003.gcbffd2a_4218_31eb_fe32_0542bc120002.gcbffd2a_4218_31eb_fe32_0542bc121145',
      name: 'image link',
      creator: CURRENT_MEMBER,
      extra: buildLinkExtra({
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Antistatic_bag.jpg/220px-Antistatic_bag.jpg',
        html: '<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Antistatic_bag.jpg/220px-Antistatic_bag.jpg">',
        thumbnails: [],
        icons: [],
      }),
      settings: { showLinkIframe: true },
    }),
    FolderItemFactory({
      id: 'gfbfed2a-4218-31eb-fe32-0542bc120002',
      path: 'fdf09f5a_5688_11eb_ae31_0242ac130003.gfbfed2a_4218_31eb_fe32_0542bc120002',
      name: 'Static Discharge: Lightning',
      creator: CURRENT_MEMBER,
      extra: {
        [ItemType.FOLDER]: {},
      },
    }),
    {
      ...FileItemFactory({
        id: 'gfbfed2a-4218-31eb-fe32-0522bc120002',
        path: 'fdf09f5a_5688_11eb_ae31_0242ac130003.gfbfed2a_4218_31eb_fe32_0542bc120002.gfbfed2a_4218_31eb_fe32_0522bc120002',
        name: 'lightning image',
        creator: CURRENT_MEMBER,
        extra: buildFileExtra({
          name: 'icon.jpeg',
          path: '9a95/e2e1/2a7b-1615910428274',
          size: 32439,
          // encoding: '7bit',
          mimetype: 'image/jpeg',
          content: '',
        }),
      }),
      readFilepath: MOCK_IMAGE_URL,
    },
    DocumentItemFactory({
      id: 'gfbfed2a-4218-31eb-fe32-0522bc120065',
      path: 'fdf09f5a_5688_11eb_ae31_0242ac130003.gfbfed2a_4218_31eb_fe32_0542bc120002.gfbfed2a_4218_31eb_fe32_0522bc120065',
      name: 'lightning text',
      creator: CURRENT_MEMBER,
      extra: buildDocumentExtra({
        content:
          '<p>Lightning is a dramatic natural example of static discharge. While the details are unclear and remain a subject of debate, the initial charge separation is thought to be associated with contact between ice particles within storm clouds. In general, significant charge accumulations can only persist in regions of low electrical conductivity (very few charges free to move in the surroundings), hence the flow of neutralizing charges often results from neutral atoms and molecules in the air being torn apart to form separate positive and negative charges, which travel in opposite directions as an electric current, neutralizing the original accumulation of charge. The static charge in air typically breaks down in this way at around 10,000 volts per centimeter (10 kV/cm) depending on humidity.</p><p>The discharge superheats the surrounding air causing the bright flash, and produces a shock wave causing the clicking sound. The lightning bolt is simply a scaled-up version of the sparks seen in more domestic occurrences of static discharge. The flash occurs because the air in the discharge channel is heated to such a high temperature that it emits light by incandescence. The clap of thunder is the result of the shock wave created as the superheated air expands explosively.</p>',
      }),
    }),
    LinkItemFactory({
      id: 'gfbfed2a-4218-31eb-fe32-0522bc120265',
      path: 'fdf09f5a_5688_11eb_ae31_0242ac130003.gfbfed2a_4218_31eb_fe32_0542bc120002.gfbfed2a_4218_31eb_fe32_0522bc120265',
      name: 'youtube link',
      creator: CURRENT_MEMBER,
      extra: buildLinkExtra({
        url: 'https://www.youtube.com/watch?v=9HS08L1EIjQ',
        thumbnails: [],
        html: '<div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 75%;"><iframe src="https://www.youtube.com/embed/9HS08L1EIjQ?feature=oembed" style="border: 0; top: 0; left: 0; width: 100%; height: 100%; position: absolute;" allowfullscreen scrolling="no" allow="encrypted-media; accelerometer; clipboard-write; gyroscope; picture-in-picture"></iframe></div>',
        icons: [],
      }),
      settings: { showLinkIframe: true },
    }),
  ].map((i) => ({
    ...i,
    permission: PermissionLevel.Admin,
  })),
};

const items: ItemForTest[] = STATIC_ELECTRICITY.items.map((i) => ({
  ...i,
  permission: PermissionLevel.Read,
}));
export const PUBLIC_STATIC_ELECTRICITY = {
  items,
};

PUBLIC_STATIC_ELECTRICITY.items = PUBLIC_STATIC_ELECTRICITY.items.map(
  (item) => {
    const newItem: ItemForTest = {
      ...item,
      visibilities: [
        {
          id: v4(),
          itemPath: item.path,
          type: 'public',
          createdAt: new Date().toISOString(),
        },
      ],
    };
    return newItem;
  },
);
PUBLIC_STATIC_ELECTRICITY.items[0].name = 'public static electricity';
