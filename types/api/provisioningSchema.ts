/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */


export interface paths {
  "/availability_status/sources": {
    /** @description Schedules a background operation of Sources availability check. These checks are are performed in separate process at it's own pace. Results are sent via Kafka to Sources. There is no output from this REST operation available, no tracking of jobs is possible. */
    post: operations["availabilityStatus"];
  };
  "/instance_types/{PROVIDER}": {
    /** @description Return a list of instance types for particular provider. A region must be provided. A zone must be provided for Azure. */
    get: operations["getInstanceTypeListAll"];
  };
  "/pubkeys": {
    /** @description A pubkey represents an SSH public portion of a key pair with name and body. This operation returns list of all pubkeys for particular account. */
    get: operations["getPubkeyList"];
    /** @description A pubkey represents an SSH public portion of a key pair with name and body. When pubkey is created, it is stored in the Provisioning database. Pubkeys are uploaded to clouds when an instance is launched. Some fields (e.g. type or fingerprint) are read only. */
    post: operations["createPubkey"];
  };
  "/pubkeys/{ID}": {
    /** @description A pubkey represents an SSH public portion of a key pair with name and body. Pubkeys must have unique name and body (SSH public key fingerprint) per each account. Pubkey type is detected during create operation as well as fingerprints. Currently two types are supported: RSA and ssh-ed25519. Also, two fingerprint types are calculated: standard SHA fingerprint and legacy MD5 fingerprint available under fingerprint_legacy field. Fingerprints are used to check uniqueness of key. */
    get: operations["getPubkeyById"];
    /** @description A pubkey represents an SSH public portion of a key pair with name and body. If a pubkey was uploaded to one or more clouds, the deletion request will attempt to delete those SSH keys from all clouds. This means in order to delete a pubkey the account must have valid credentials to all cloud accounts the pubkey was uploaded to, otherwise the delete operation will fail and the pubkey will not be deleted from Provisioning database. This operation returns no body. */
    delete: operations["removePubkeyById"];
  };
  "/reservations": {
    /** @description A reservation is a way to activate a job, keeps all data needed for a job to start. This operation returns list of all reservations for particular account. To get a reservation with common fields, use /reservations/ID. To get a detailed reservation with all fields which are different per provider, use /reservations/aws/ID. */
    get: operations["getReservationsList"];
  };
  "/reservations/aws": {
    /** @description A reservation is a way to activate a job, keeps all data needed for a job to start. An AWS reservation is a reservation created for an AWS job. Image Builder UUID image is required, the service will also launch any AMI image prefixed with "ami-". Optionally, AWS EC2 launch template ID can be provided. All flags set through this endpoint override template values. Public key must exist prior calling this endpoint and ID must be provided, even when AWS EC2 launch template provides ssh-keys. Public key will be always be overwritten. */
    post: operations["createAwsReservation"];
  };
  "/reservations/aws/{ID}": {
    /** @description Return an AWS reservation with details by id */
    get: operations["getAWSReservationByID"];
  };
  "/reservations/azure": {
    /** @description A reservation is a way to activate a job, keeps all data needed for a job to start. An Azure reservation is a reservation created for an Azure job. Image Builder UUID image is required and needs to be stored under same account as provided by SourceID. */
    post: operations["createAzureReservation"];
  };
  "/reservations/azure/{ID}": {
    /** @description Return an Azure reservation with details by id */
    get: operations["getAzureReservationByID"];
  };
  "/reservations/noop": {
    /** @description A reservation is a way to activate a job, keeps all data needed for a job to start. A Noop reservation actually does nothing and immediately finish background job. This reservation has no input payload */
    post: operations["createNoopReservation"];
  };
  "/reservations/{ID}": {
    /** @description Return a generic reservation by id */
    get: operations["getReservationByID"];
  };
  "/sources": {
    /** @description Cloud credentials are kept in the sources application. This endpoint lists available sources for the particular account per individual type (AWS, Azure, ...). All the fields in the response are optional and can be omitted if Sources application also omits them. */
    get: operations["getSourceList"];
  };
  "/sources/{ID}/account_identity": {
    /**
     * @deprecated 
     * @description This endpoint is deprecated. Please use upload_info instead
     */
    get: operations["getSourceAccountIdentity"];
  };
  "/sources/{ID}/instance_types": {
    /**
     * @deprecated 
     * @description Deprecated endpoint, use /instance_types instead.
     */
    get: operations["getInstanceTypeList"];
  };
  "/sources/{ID}/launch_templates": {
    /**
     * @description Return a list of launch templates.
     * A launch template is a configuration set with a name that is available through hyperscaler API. When creating reservations, launch template can be provided in order to set additional configuration for instances.
     * Currently only AWS Launch Templates are supported.
     */
    get: operations["getLaunchTemplatesList"];
  };
  "/sources/{ID}/upload_info": {
    /**
     * @description Provides all necessary information to upload an image for given Source. Typically, this is account number, subscription ID but some hyperscaler types also provide additional data.
     * The response contains "provider" field which can be one of aws, azure or gcp and then exactly one field named "aws", "azure" or "gcp". Enum is not used due to limitation of the language (Go).
     * Some types may perform more than one calls (e.g. Azure) so latency might be increased. Caching of static information is performed to improve latency of consequent calls.
     */
    get: operations["getSourceUploadInfo"];
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    "v1.AWSReservationRequest": {
      /** Format: int32 */
      amount?: number;
      image_id?: string;
      instance_type?: string;
      launch_template_id?: string;
      name?: string;
      poweroff?: boolean;
      /** Format: int64 */
      pubkey_id?: number;
      region?: string;
      source_id?: string;
    };
    "v1.AWSReservationResponse": {
      /** Format: int32 */
      amount?: number;
      aws_reservation_id?: string;
      image_id?: string;
      instance_type?: string;
      instances?: ({
          detail?: {
            public_dns?: string;
            public_ipv4?: string;
          };
          instance_id?: string;
        })[];
      launch_template_id?: string;
      name?: string;
      poweroff?: boolean;
      /** Format: int64 */
      pubkey_id?: number;
      region?: string;
      /** Format: int64 */
      reservation_id?: number;
      source_id?: string;
    };
    "v1.AccountIDTypeResponse": {
      aws?: {
        account_id?: string;
      };
    };
    "v1.AvailabilityStatusRequest": {
      source_id?: string;
    };
    "v1.AzureReservationRequest": {
      /** Format: int64 */
      amount?: number;
      image_id?: string;
      instance_size?: string;
      location?: string;
      name?: string;
      poweroff?: boolean;
      /** Format: int64 */
      pubkey_id?: number;
      source_id?: string;
    };
    "v1.AzureReservationResponse": {
      /** Format: int64 */
      amount?: number;
      image_id?: string;
      instance_size?: string;
      instances?: ({
          detail?: {
            public_dns?: string;
            public_ipv4?: string;
          };
          instance_id?: string;
        })[];
      location?: string;
      name?: string;
      poweroff?: boolean;
      /** Format: int64 */
      pubkey_id?: number;
      /** Format: int64 */
      reservation_id?: number;
      source_id?: string;
    };
    "v1.InstanceTypeResponse": {
      architecture?: string;
      azure?: {
        gen_v1?: boolean;
        gen_v2?: boolean;
      };
      /** Format: int32 */
      cores?: number;
      /** Format: int64 */
      memory_mib?: number;
      name?: string;
      /** Format: int64 */
      storage_gb?: number;
      supported?: boolean;
      /** Format: int32 */
      vcpus?: number;
    };
    "v1.LaunchTemplatesResponse": {
      id?: string;
      name?: string;
    };
    "v1.NoopReservationResponse": {
      /** Format: int64 */
      reservation_id?: number;
    };
    "v1.PubkeyRequest": {
      body?: string;
      name?: string;
    };
    "v1.PubkeyResponse": {
      body?: string;
      fingerprint?: string;
      fingerprint_legacy?: string;
      /** Format: int64 */
      id?: number;
      name?: string;
      type?: string;
    };
    "v1.ReservationResponse": {
      /** Format: date-time */
      created_at?: string;
      error?: string;
      /** Format: date-time */
      finished_at?: string | null;
      /** Format: int64 */
      id?: number;
      provider?: number;
      status?: string;
      /** Format: int32 */
      step?: number;
      step_titles?: (string)[];
      /** Format: int32 */
      steps?: number;
      success?: boolean | null;
    };
    "v1.ResponseError": {
      build_time?: string;
      edge_id?: string;
      environment?: string;
      error?: string;
      msg?: string;
      trace_id?: string;
      version?: string;
    };
    "v1.SourceResponse": {
      id?: string;
      name?: string;
      source_type_id?: string;
      uid?: string;
    };
    "v1.SourceUploadInfoResponse": {
      aws?: {
        account_id?: string;
      } | null;
      azure?: {
        resource_groups?: (string)[];
        subscription_id?: string;
        tenant_id?: string;
      } | null;
      provider?: string;
    };
  };
  responses: {
    /** @description The request's parameters are not valid */
    BadRequest: {
      content: {
        "application/json": components["schemas"]["v1.ResponseError"];
      };
    };
    /** @description The server encountered an internal error */
    InternalError: {
      content: {
        "application/json": components["schemas"]["v1.ResponseError"];
      };
    };
    /** @description The requested resource was not found */
    NotFound: {
      content: {
        "application/json": components["schemas"]["v1.ResponseError"];
      };
    };
  };
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type external = Record<string, never>;

export interface operations {

  /** @description Schedules a background operation of Sources availability check. These checks are are performed in separate process at it's own pace. Results are sent via Kafka to Sources. There is no output from this REST operation available, no tracking of jobs is possible. */
  availabilityStatus: {
    /** @description availability status request with source id */
    requestBody: {
      content: {
        "application/json": components["schemas"]["v1.AvailabilityStatusRequest"];
      };
    };
    responses: {
      /** @description Returned on success, empty response. */
      200: never;
      500: components["responses"]["InternalError"];
    };
  };
  /** @description Return a list of instance types for particular provider. A region must be provided. A zone must be provided for Azure. */
  getInstanceTypeListAll: {
    parameters: {
      query: {
        /** @description Region to list instance types within. This is required. */
        region: string;
        /** @description Availability zone (or location) to list instance types within. Not applicable for AWS EC2 as all zones within a region are the same (will lead to an error when used). Required for Azure. */
        zone?: string;
      };
      path: {
        /** @description Cloud provider: aws, azure */
        PROVIDER: string;
      };
    };
    responses: {
      /** @description Return on success. Instance types have a field "supported" that indicates whether that particular type is supported by Red Hat. Typically, instances with less than 1.5 GiB RAM are not supported, but other rules may apply. */
      200: {
        content: {
          "application/json": (components["schemas"]["v1.InstanceTypeResponse"])[];
        };
      };
      404: components["responses"]["NotFound"];
      500: components["responses"]["InternalError"];
    };
  };
  /** @description A pubkey represents an SSH public portion of a key pair with name and body. This operation returns list of all pubkeys for particular account. */
  getPubkeyList: {
    responses: {
      /** @description Returned on success. */
      200: {
        content: {
          "application/json": (components["schemas"]["v1.PubkeyResponse"])[];
        };
      };
      500: components["responses"]["InternalError"];
    };
  };
  /** @description A pubkey represents an SSH public portion of a key pair with name and body. When pubkey is created, it is stored in the Provisioning database. Pubkeys are uploaded to clouds when an instance is launched. Some fields (e.g. type or fingerprint) are read only. */
  createPubkey: {
    /** @description request body */
    requestBody: {
      content: {
        "application/json": components["schemas"]["v1.PubkeyRequest"];
      };
    };
    responses: {
      /** @description Returned on success. */
      200: {
        content: {
          "application/json": components["schemas"]["v1.PubkeyResponse"];
        };
      };
      500: components["responses"]["InternalError"];
    };
  };
  /** @description A pubkey represents an SSH public portion of a key pair with name and body. Pubkeys must have unique name and body (SSH public key fingerprint) per each account. Pubkey type is detected during create operation as well as fingerprints. Currently two types are supported: RSA and ssh-ed25519. Also, two fingerprint types are calculated: standard SHA fingerprint and legacy MD5 fingerprint available under fingerprint_legacy field. Fingerprints are used to check uniqueness of key. */
  getPubkeyById: {
    parameters: {
      path: {
        /** @description Database ID to search for */
        ID: number;
      };
    };
    responses: {
      /** @description Returned on success */
      200: {
        content: {
          "application/json": components["schemas"]["v1.PubkeyResponse"];
        };
      };
      404: components["responses"]["NotFound"];
      500: components["responses"]["InternalError"];
    };
  };
  /** @description A pubkey represents an SSH public portion of a key pair with name and body. If a pubkey was uploaded to one or more clouds, the deletion request will attempt to delete those SSH keys from all clouds. This means in order to delete a pubkey the account must have valid credentials to all cloud accounts the pubkey was uploaded to, otherwise the delete operation will fail and the pubkey will not be deleted from Provisioning database. This operation returns no body. */
  removePubkeyById: {
    parameters: {
      path: {
        /** @description Database ID of resource. */
        ID: number;
      };
    };
    responses: {
      /** @description The Pubkey was deleted successfully. */
      204: never;
      404: components["responses"]["NotFound"];
      500: components["responses"]["InternalError"];
    };
  };
  /** @description A reservation is a way to activate a job, keeps all data needed for a job to start. This operation returns list of all reservations for particular account. To get a reservation with common fields, use /reservations/ID. To get a detailed reservation with all fields which are different per provider, use /reservations/aws/ID. */
  getReservationsList: {
    responses: {
      /** @description Returned on success. */
      200: {
        content: {
          "application/json": (components["schemas"]["v1.ReservationResponse"])[];
        };
      };
      500: components["responses"]["InternalError"];
    };
  };
  /** @description A reservation is a way to activate a job, keeps all data needed for a job to start. An AWS reservation is a reservation created for an AWS job. Image Builder UUID image is required, the service will also launch any AMI image prefixed with "ami-". Optionally, AWS EC2 launch template ID can be provided. All flags set through this endpoint override template values. Public key must exist prior calling this endpoint and ID must be provided, even when AWS EC2 launch template provides ssh-keys. Public key will be always be overwritten. */
  createAwsReservation: {
    /** @description aws request body */
    requestBody: {
      content: {
        "application/json": components["schemas"]["v1.AWSReservationRequest"];
      };
    };
    responses: {
      /** @description Returned on success. */
      200: {
        content: {
          "application/json": components["schemas"]["v1.AWSReservationResponse"];
        };
      };
      500: components["responses"]["InternalError"];
    };
  };
  /** @description Return an AWS reservation with details by id */
  getAWSReservationByID: {
    parameters: {
      path: {
        /** @description Reservation ID, must be an AWS reservation otherwise 404 is returned */
        ID: number;
      };
    };
    responses: {
      /** @description Returns detailed reservation information for an AWS reservation. */
      200: {
        content: {
          "application/json": components["schemas"]["v1.AWSReservationResponse"];
        };
      };
      404: components["responses"]["NotFound"];
      500: components["responses"]["InternalError"];
    };
  };
  /** @description A reservation is a way to activate a job, keeps all data needed for a job to start. An Azure reservation is a reservation created for an Azure job. Image Builder UUID image is required and needs to be stored under same account as provided by SourceID. */
  createAzureReservation: {
    /** @description aws request body */
    requestBody: {
      content: {
        "application/json": components["schemas"]["v1.AzureReservationRequest"];
      };
    };
    responses: {
      /** @description Returned on success. */
      200: {
        content: {
          "application/json": components["schemas"]["v1.AzureReservationResponse"];
        };
      };
      500: components["responses"]["InternalError"];
    };
  };
  /** @description Return an Azure reservation with details by id */
  getAzureReservationByID: {
    parameters: {
      path: {
        /** @description Reservation ID, must be an Azure reservation otherwise 404 is returned */
        ID: number;
      };
    };
    responses: {
      /** @description Returns detailed reservation information for an Azure reservation. */
      200: {
        content: {
          "application/json": components["schemas"]["v1.AzureReservationResponse"];
        };
      };
      404: components["responses"]["NotFound"];
      500: components["responses"]["InternalError"];
    };
  };
  /** @description A reservation is a way to activate a job, keeps all data needed for a job to start. A Noop reservation actually does nothing and immediately finish background job. This reservation has no input payload */
  createNoopReservation: {
    responses: {
      /** @description Returned on success. */
      200: {
        content: {
          "application/json": components["schemas"]["v1.NoopReservationResponse"];
        };
      };
      500: components["responses"]["InternalError"];
    };
  };
  /** @description Return a generic reservation by id */
  getReservationByID: {
    parameters: {
      path: {
        /** @description Reservation ID */
        ID: number;
      };
    };
    responses: {
      /** @description Returns generic reservation information like status or creation time. */
      200: {
        content: {
          "application/json": components["schemas"]["v1.ReservationResponse"];
        };
      };
      404: components["responses"]["NotFound"];
      500: components["responses"]["InternalError"];
    };
  };
  /** @description Cloud credentials are kept in the sources application. This endpoint lists available sources for the particular account per individual type (AWS, Azure, ...). All the fields in the response are optional and can be omitted if Sources application also omits them. */
  getSourceList: {
    parameters: {
      query?: {
        provider?: "aws" | "azure" | "gcp";
      };
    };
    responses: {
      /** @description Returned on success. */
      200: {
        content: {
          "application/json": (components["schemas"]["v1.SourceResponse"])[];
        };
      };
      500: components["responses"]["InternalError"];
    };
  };
  /**
   * @deprecated 
   * @description This endpoint is deprecated. Please use upload_info instead
   */
  getSourceAccountIdentity: {
    parameters: {
      path: {
        /** @description Source ID from Sources Database */
        ID: number;
      };
    };
    responses: {
      /** @description Return on success. */
      200: {
        content: {
          "application/json": components["schemas"]["v1.AccountIDTypeResponse"];
        };
      };
      404: components["responses"]["NotFound"];
      500: components["responses"]["InternalError"];
    };
  };
  /**
   * @deprecated 
   * @description Deprecated endpoint, use /instance_types instead.
   */
  getInstanceTypeList: {
    parameters: {
      query: {
        /** @description Hyperscaler region */
        region: string;
      };
      path: {
        /** @description Source ID from Sources Database */
        ID: number;
      };
    };
    responses: {
      /** @description Return on success. */
      200: {
        content: {
          "application/json": (components["schemas"]["v1.InstanceTypeResponse"])[];
        };
      };
      404: components["responses"]["NotFound"];
      500: components["responses"]["InternalError"];
    };
  };
  /**
   * @description Return a list of launch templates.
   * A launch template is a configuration set with a name that is available through hyperscaler API. When creating reservations, launch template can be provided in order to set additional configuration for instances.
   * Currently only AWS Launch Templates are supported.
   */
  getLaunchTemplatesList: {
    parameters: {
      query: {
        /** @description Hyperscaler region */
        region: string;
      };
      path: {
        /** @description Source ID from Sources Database */
        ID: number;
      };
    };
    responses: {
      /** @description Return on success. */
      200: {
        content: {
          "application/json": (components["schemas"]["v1.LaunchTemplatesResponse"])[];
        };
      };
      404: components["responses"]["NotFound"];
      500: components["responses"]["InternalError"];
    };
  };
  /**
   * @description Provides all necessary information to upload an image for given Source. Typically, this is account number, subscription ID but some hyperscaler types also provide additional data.
   * The response contains "provider" field which can be one of aws, azure or gcp and then exactly one field named "aws", "azure" or "gcp". Enum is not used due to limitation of the language (Go).
   * Some types may perform more than one calls (e.g. Azure) so latency might be increased. Caching of static information is performed to improve latency of consequent calls.
   */
  getSourceUploadInfo: {
    parameters: {
      path: {
        /** @description Source ID from Sources Database */
        ID: number;
      };
    };
    responses: {
      /** @description Return on success. */
      200: {
        content: {
          "application/json": components["schemas"]["v1.SourceUploadInfoResponse"];
        };
      };
      404: components["responses"]["NotFound"];
      500: components["responses"]["InternalError"];
    };
  };
}
