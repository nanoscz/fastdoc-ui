export const MAP_STYLES: {
  defaultStyles: Array<google.maps.MapTypeStyle>;
} = {
  defaultStyles: [
    {
      elementType: 'labels',
      stylers: [
        {
          visibility: 'off'
        }
      ]
    },
    {
      elementType: 'labels.icon',
      stylers: [
        {
          visibility: 'off'
        }
      ]
    },
    {
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#676a71'
        },
        {
          visibility: 'on'
        }
      ]
    },
    {
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#ffffff'
        },
        {
          visibility: 'on'
        }
      ]
    },
    {
      featureType: 'administrative',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#fefefe'
        },
        {
          lightness: 20
        }
      ]
    },
    {
      featureType: 'administrative.land_parcel',
      stylers: [
        {
          visibility: 'off'
        }
      ]
    },
    {
      featureType: 'administrative.locality',
      stylers: [
        {
          visibility: 'off'
        }
      ]
    },
    {
      featureType: 'administrative.neighborhood',
      stylers: [
        {
          visibility: 'off'
        }
      ]
    },
    {
      featureType: 'administrative.province',
      stylers: [
        {
          visibility: 'off'
        }
      ]
    },
    {
      featureType: 'administrative.country',
      stylers: [
        {
          visibility: 'on'
        }
      ]
    },
    {
      featureType: 'administrative.country',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#9EC713'
        }
      ]
    },
    {
      featureType: 'landscape',
      elementType: 'geometry',
      stylers: [
        {
          color: '#f5f5f5'
        },
        {
          lightness: 20
        }
      ]
    },
    {
      featureType: 'poi',
      elementType: 'geometry',
      stylers: [
        {
          color: '#f5f5f5'
        },
        {
          lightness: 21
        }
      ]
    },
    {
      featureType: 'poi.business',
      stylers: [
        {
          visibility: 'off'
        }
      ]
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [
        {
          color: '#dedede'
        },
        {
          lightness: 21
        }
      ]
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text',
      stylers: [
        {
          visibility: 'off'
        }
      ]
    },
    // {
    //   featureType: 'road',
    //   stylers: [
    //     {
    //       visibility: 'off'
    //     }
    //   ]
    // },
    {
      featureType: 'road.arterial',
      elementType: 'geometry',
      stylers: [
        {
          color: '#ffffff'
        },
        {
          lightness: 18
        }
      ]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#ffffff'
        },
        {
          lightness: 17
        }
      ]
    },
    {
      featureType: 'road.local',
      elementType: 'geometry',
      stylers: [
        {
          color: '#ffffff'
        },
        {
          lightness: 16
        }
      ]
    },
    {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [
        {
          color: '#f2f2f2'
        },
        {
          lightness: 19
        }
      ]
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [
        {
          color: '#ffffff'
        }
      ]
    },
    {
      featureType: 'water',
      elementType: 'labels',
      stylers: [
        {
          visibility: 'off'
        }
      ]
    }
  ]
};
